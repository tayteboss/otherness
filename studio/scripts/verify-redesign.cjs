const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const file = path.resolve(__dirname, '../schemas/redesign/index.ts');
const m = new Module(file, module);
m.filename = file;
m.paths = Module._nodeModulePaths(path.dirname(file));
m._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module:ts.ModuleKind.CommonJS, target:ts.ScriptTarget.ES2017}}).outputText, file);
const {redesignSchemaTypes, redesignSingletons} = m.exports;
const {Schema} = require('@sanity/schema');
const schema = Schema.compile({name:'redesign', types:[...['project', 'article', 'homePage', 'workPage', 'conversationsPage', 'whatToExpectPage'].map((name) => ({name, type:'document', fields:[{name:'title', type:'string'}]})), ...redesignSchemaTypes]});
for (const {name} of redesignSingletons) assert.ok(schema.get(name));
for (const doc of redesignSchemaTypes.filter((s) => s.type === 'document')) {
  assert.ok(doc.groups.length > 1);
  for (const f of doc.fields) assert.ok(doc.groups.some((g) => g.name === f.group), `${doc.name}.${f.name} group`);
}
assert.equal(schema.get('redesignImage').options.hotspot, true);
assert.ok(schema.get('redesignImage').fields.some((f) => f.name === 'alt'));
assert.ok(!redesignSingletons.some((s) => s.name === 'homePage' || s.name === 'contactPage'));
console.log('PASS: all seven redesign types compile; singleton groups resolve; image alt and hotspot; legacy Home and deferred Contact excluded.');
const homeSchema = redesignSchemaTypes.find((s) => s.name === 'homePageV2');
const projectCard = homeSchema.fields.find((f) => f.name === 'services').of[0].fields.find((f) => f.name === 'projects').of[0];
assert.equal(projectCard.fields.find((f) => f.name === 'image').hidden, true);
assert.equal(projectCard.preview.select.media, 'project.thumbnailMedia.image');
const waySchema = redesignSchemaTypes.find((s) => s.name === 'ourWayPage');
const logoLink = waySchema.fields.find((f) => f.name === 'credentials').fields.find((f) => f.name === 'logos').of[0].fields.find((f) => f.name === 'link');
const linkRules = {required() { throw new Error('Logo links must be optional'); }, uri(options) { assert.equal(options.allowRelative, true); return this; }};
logoLink.fields.forEach((f) => f.validation?.(linkRules));
console.log('PASS: custom Home image editor is hidden; project media preview used; logo label and URL optional with URL validation retained.');


// Exercise the actual GROQ projections against drafts, duplicate types and a
// missing reference, without mutating the dataset to manufacture test content.
(async () => {
  // Sanity 3.30's validation scheduler uses browser timer shims in Node.
  global.window = {setTimeout, clearTimeout};
  const {validateDocument} = require('sanity');
  const validateLogoLink = (link) => validateDocument({
    document: {_id:'ourWayPage', _type:'ourWayPage', credentials:{logos:[{_key:'logo', _type:'recognitionLogo', link}]}},
    workspace: {schema},
    environment: 'cli',
    getDocumentExists: async () => true,
  });
  for (const link of [undefined, {}, {_type:'redesignLink'}, {label:'Logo'}, {href:''}, {href:'/work'}, {href:'https://example.com'}]) {
    const errors = await validateLogoLink(link);
    assert.deepEqual(errors.filter((e) => e.path.includes('link')), []);
  }
  assert.ok((await validateLogoLink({href:'javascript:alert(1)'})).some((e) => e.path.includes('href')));
  console.log('PASS: actual Sanity document validation accepts missing/empty/label-only/existing-type links and valid paths/URLs, rejecting unsafe URLs.');
  const {parse, evaluate} = require('groq-js');
  const {redesignQuery} = require('../../frontend/lib/redesign/queries');
  const dataset = [
    {_id:'homePage', _type:'homePage', heroTitle:'Legacy'},
    {_id:'duplicate-home', _type:'homePageV2', landing:{statement:'Wrong document'}},
    {_id:'drafts.homePageV2', _type:'homePageV2', landing:{statement:'Draft'}},
    {_id:'homePageV2', _type:'homePageV2', landing:{statement:'Published'}, editorialNotes:'Internal', services:[{_key:'branding', title:'Branding', projects:[{_key:'missing', project:{_type:'reference', _ref:'missing-project'}}]}]},
  ];
  const result = await (await evaluate(parse(redesignQuery), {dataset})).get();
  assert.equal(result.home.landing.statement, 'Published');
  assert.equal(result.home.editorialNotes, undefined);
  assert.equal(result.home.landing.desktopImage, null);
  assert.equal(result.home.services[0]._key, 'branding');
  assert.equal(result.home.services[0].projects[0].project, null);
  assert.equal(result.home.services[0].projects[0].projectId, 'missing-project');
  assert.equal(result.settings, null);
  assert.equal(result.ourWay, null);
  const fallback = {_id:'siteSettingsV2', _type:'siteSettingsV2', navigation:[], footer:{heading:'Fallback'}};
  dataset.push(fallback);
  const query = async () => (await evaluate(parse(redesignQuery), {dataset})).get();
  const card = dataset[3].services[0].projects[0];
  card.caption = 'Repeated legacy homepage caption';
  const project = {_id:'missing-project', _type:'project', title:'Project', tagline:'This project’s own tagline'};
  dataset.push(project);
  assert.equal((await query()).home.services[0].projects[0].caption, project.tagline);
  project.tagline = 'Updated project tagline';
  assert.equal((await query()).home.services[0].projects[0].caption, project.tagline);
  delete project.tagline;
  assert.equal((await query()).home.services[0].projects[0].caption, null);
  console.log('PASS: Home captions follow linked project tagline edits and omit missing taglines without stale caption fallback.');
  const asset = {_id:'project-image', _type:'sanity.imageAsset', url:'https://cdn.sanity.io/project.jpg'};
  dataset.push(asset, {_id:'project-video', _type:'mux.videoAsset', playbackId:'current-video'});
  card.image = {asset:{_ref:'old-home-image'}};
  project.thumbnailMedia = {mediaType:'image', image:{asset:{_ref:asset._id}}};
  assert.equal((await query()).home.services[0].projects[0].thumbnailMedia.image.asset.url, asset.url);
  asset.url = 'https://cdn.sanity.io/updated-project.jpg';
  assert.equal((await query()).home.services[0].projects[0].thumbnailMedia.image.asset.url, asset.url);
  project.thumbnailMedia = {mediaType:'video', video:{asset:{_ref:'project-video'}}};
  assert.equal((await query()).home.services[0].projects[0].thumbnailMedia.video.asset.playbackId, 'current-video');
  delete project.thumbnailMedia;
  assert.equal((await query()).home.services[0].projects[0].thumbnailMedia, null);
  dataset.push({_id:'ourWayPage', _type:'ourWayPage', credentials:{logos:[{_key:'none'}, {_key:'empty', link:{}}, {_key:'label', link:{label:'Logo'}}, {_key:'linked', link:{href:'/work'}}]}});
  assert.deepEqual((await query()).ourWay.credentials.logos.map((logo) => logo.link?.href ?? null), [null, null, null, '/work']);
  console.log('PASS: project image/video thumbnail updates resolve directly, missing media has no old Home fallback, and all optional logo link shapes project safely.');

  assert.equal((await query()).settings._id, 'siteSettingsV2');
  dataset.push({_id:'siteSettings', _type:'siteSettings', navigation:[], footer:{heading:'Active'}});
  dataset[0].noticedList = [{_key:'old', title:'Archived'}];
  dataset[3].noticedList = [{_key:'active', title:'Current'}];
  assert.equal((await query()).settings.footer.heading, 'Active');
  assert.equal((await query()).legacyNoticed[0].title, 'Current');
  dataset[3].noticedList = [];
  assert.deepEqual((await query()).legacyNoticed, []);
  const {promotionPatches} = require('../../frontend/scripts/redesign/promote-cms.cjs');
  const migration = [
    {_id:'siteSettings', _rev:'one', tagline:'Keep', footer:{heading:'Already edited'}},
    {_id:'siteSettingsV2', navigation:[], footer:{heading:'Source'}, seo:{title:'SEO'}},
    {_id:'homePage', noticedList:[{_key:'original', title:'Keep'}]},
    {_id:'homePageV2', _rev:'two'},
  ];
  const patches = promotionPatches(migration);
  assert.equal(patches[0].setIfMissing.footer, undefined);
  assert.equal(patches[0].setIfMissing.tagline, undefined);
  assert.equal(patches[1].setIfMissing.noticedList[0]._key, 'original');
  assert.throws(() => promotionPatches([...migration, {_id:'drafts.siteSettings'}]), /resolve draft/);
  for (const patch of patches) Object.assign(migration.find((d) => d._id === patch.id), patch.setIfMissing);
  assert.deepEqual(promotionPatches(migration), []);
  console.log('PASS: canonical settings and Noticed queries, empty-list handling, fallback, additive migration, draft guard and idempotency.');
  console.log('PASS: GROQ selects fixed published ID despite duplicate types/drafts; excludes internal notes; preserves keys and unresolved reference IDs; missing assets and documents return null.');
})().catch((e) => {console.error(e); process.exitCode=1;});

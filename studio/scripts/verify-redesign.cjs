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
const schema = Schema.compile({name:'redesign', types:[{name:'project', type:'document', fields:[{name:'title', type:'string'}]}, ...redesignSchemaTypes]});
for (const {name} of redesignSingletons) assert.ok(schema.get(name));
for (const doc of redesignSchemaTypes.filter((s) => s.type === 'document')) {
  assert.ok(doc.groups.length > 1);
  for (const f of doc.fields) assert.ok(doc.groups.some((g) => g.name === f.group), `${doc.name}.${f.name} group`);
}
assert.equal(schema.get('redesignImage').options.hotspot, true);
assert.ok(schema.get('redesignImage').fields.some((f) => f.name === 'alt'));
assert.ok(!redesignSingletons.some((s) => s.name === 'homePage' || s.name === 'contactPage'));
console.log('PASS: all seven redesign types compile; singleton groups resolve; image alt and hotspot; legacy Home and deferred Contact excluded.');

// Exercise the actual GROQ projections against drafts, duplicate types and a
// missing reference, without mutating the dataset to manufacture test content.
(async () => {
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
  console.log('PASS: GROQ selects fixed published ID despite duplicate types/drafts; excludes internal notes; preserves keys and unresolved reference IDs; missing assets and documents return null.');
})().catch((e) => {console.error(e); process.exitCode=1;});

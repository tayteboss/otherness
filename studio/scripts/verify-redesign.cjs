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

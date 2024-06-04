const modules = import.meta.glob('./*.ts', { eager: true });
const directory: object = {};
console.log(modules, 'modules');
for (const path in modules) {
  console.log(modules[path]);
  for (const item in modules[path] as object) {
    const res = modules[path][item];
    Object.assign(directory, { [item]: res });
  }
}
export default directory;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modules: Record<string, { [key: string]: any }> = import.meta.glob('./*.ts', { eager: true });
const directory: object = {};
for (const path in modules) {
  for (const item in modules[path]) {
    const res = modules[path][item];
    Object.assign(directory, { [item]: res });
  }
}
export default directory;

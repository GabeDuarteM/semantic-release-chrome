const modulesCache: { [keyof: string]: any } = {}

async function getEsModule(moduleName: string) {
  if (modulesCache[moduleName]) {
    return modulesCache[moduleName]
  }

  const module = (await import(moduleName)).default
  modulesCache[moduleName] = module

  return module
}

export default getEsModule

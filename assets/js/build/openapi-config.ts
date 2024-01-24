import { type ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: '../assets/api/docs.jsonopenapi.json',
  apiFile: '../app/api/pimcore/index.ts',
  apiImport: 'api',
  outputFile: './test.gen.ts',
  exportName: 'api',
  hooks: true,
  tag: true
}

export default config

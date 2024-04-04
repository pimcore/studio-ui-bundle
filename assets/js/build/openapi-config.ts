import { type ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: '../assets/api/docs.jsonopenapi.json',
  apiFile: '../src/app/api/pimcore/index.ts',
  apiImport: 'api',
  outputFiles: {
    '../src/modules/asset/asset-api-slice.gen.ts': {
      filterEndpoints: [/assets/i]
    },
    '../src/modules/app/translations/translations-api-slice.gen.ts': {
      filterEndpoints: [/translations/i]
    }
  },
  exportName: 'api',
  hooks: true,
  tag: true
}

export default config

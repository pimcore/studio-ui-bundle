interface PimcoreThemeConfig {
  token: Record<string, unknown>
  components: Record<string, unknown>
}

const staticTokens = {
  token: {
    fontFamily: 'Lato, sans-serif'
  }
}

const defaultTheme = {
  token: {
    colorLinkHover: '#9254de',
    controlOutline: 'rgba(0.4470588266849518, 0.18039216101169586, 0.8196078538894653, 0.10000000149011612)',
    controlItemBgActive: '#f8eeff',
    colorTextTertiary: 'rgba(0, 0, 0, 0.6)',
    colorFill: 'rgba(0.9098039269447327, 0.8941176533699036, 0.9450980424880981, 0.6000000238418579)',
    colorFillQuaternary: 'rgba(0.9098039269447327, 0.8941176533699036, 0.9450980424880981, 0.44999998807907104)',
    colorBgLayout: '#fcfcfc',
    colorPrimary: '#722ed1',
    fontSize: 12,
    fontSizeHeading1: 35,
    colorIconSecondary: '#4d4169',
    colorFillNav: 'rgba(0.3019607961177826, 0.2549019753932953, 0.4117647111415863, 0.07999999821186066)',
    colorIconSidebar: '#22075e',
    colorBorderActive: '#fa8c16',
    colorLogo: '#5520a6',
    colorBorderTertiary: '#dfd7ea',
    colorTextTreeElement: '#404655',
    colorIconTree: '#404655',
    colorIconTreeUnpublished: 'rgba(0.250980406999588, 0.27450981736183167, 0.3333333432674408, 0.4000000059604645)',
    colorBgToolbar: '#f5f3fa',
    ...staticTokens.token
  },

  components: {
    Pagination: {
      colorPrimary: '#531dab'
    },

    Tree: {
      colorBorderTree: '#dfd7ea',
      colorTextTree: '#404655',
      colorPrimaryHeading: '#531dab',
      colorTextTreeUnpublished: 'rgba(0, 0, 0, 0.25)'
    },

    Button: {
      defaultBorderColor: '#d3adf7',
      defaultColor: '#722ed1',
      defaultGhostBorderColor: '#d9d9d9',
      textGhostColor: 'rgba(0, 0, 0, 0.8799999952316284)'
    },

    Table: {
      cellPaddingBlockSM: 4,
      cellPaddingInlineSM: 4,
      footerBg: '#fafafa',
      headerBg: '#fafafa'
    },

    Tabs: {
      colorBgSelectedTab: '#ffffff',
      inkBarColor: '#531dab',
      itemColor: 'rgba(0, 0, 0, 0.6499999761581421)',
      itemHoverColor: 'rgba(0.9098039269447327, 0.8941176533699036, 0.9450980424880981, 0.6000000238418579)',
      itemUnselectedIconColor: '#4d4169',
      colorBorderActiveTab: '#fa8c16',
      colorBgUnselectedTab: 'rgba(0.9098039269447327, 0.8941176533699036, 0.9450980424880981, 0.44999998807907104)',
      colorBgHoverUnselectedTab: 'rgba(0.9098039269447327, 0.8941176533699036, 0.9450980424880981, 0.6000000238418579)',
      colorBorderContainer: '#dfd7ea',
      paddingTabs: 8
    },

    Avatar: {
      colorUserIndicator: '#722ed1'
    },

    Example: {
      color: '#722ed1'
    }
  }
}

type tokens = typeof defaultTheme.token
type components = typeof defaultTheme.components

// workaround for invalid rgba values provided by ant theme buddy
let jsonString = JSON.stringify(defaultTheme)
const rgbaExtractorRegex = /rgba\((?<red>\d+(\.\d+)?),\s(?<green>\d+(\.\d+)?),\s(?<blue>\d+(\.\d+)?),\s(?<alpha>\d+(\.\d+)?)\)/g
jsonString = jsonString.replace(rgbaExtractorRegex, (match, r, rFractional, g, gFractional, b, bFractional, a) => {
  return `rgba(${r * 256}, ${g * 256}, ${b * 256}, ${a})`
})
const purifiedTheme = JSON.parse(jsonString)

const PimcoreDefaultTheme: PimcoreThemeConfig = purifiedTheme

export { PimcoreDefaultTheme }

declare module 'antd-style' {
  export interface ThemeConfig extends PimcoreThemeConfig {}
  export interface FullToken extends tokens, components {}
}

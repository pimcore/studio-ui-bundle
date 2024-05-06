/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/
interface PimcoreThemeConfig {
    token: Record<string, unknown>;
    components: Record<string, unknown>;
}
declare const defaultTheme: {
    token: {
        fontFamily: string;
        colorLinkHover: string;
        controlOutline: string;
        controlItemBgActive: string;
        colorTextTertiary: string;
        colorFill: string;
        colorFillQuaternary: string;
        colorBgLayout: string;
        colorPrimary: string;
        fontSize: number;
        fontSizeHeading1: number;
        colorIconSecondary: string;
        colorFillNav: string;
        colorIconSidebar: string;
        colorBorderActive: string;
        colorLogo: string;
        colorBorderTertiary: string;
        colorTextTreeElement: string;
        colorIconTree: string;
        colorIconTreeUnpublished: string;
        colorBgToolbar: string;
    };
    components: {
        Pagination: {
            colorPrimary: string;
        };
        Tree: {
            colorBorderTree: string;
            colorTextTree: string;
            colorPrimaryHeading: string;
            colorTextTreeUnpublished: string;
        };
        Button: {
            defaultBorderColor: string;
            defaultColor: string;
            defaultGhostBorderColor: string;
            textGhostColor: string;
        };
        Table: {
            cellPaddingBlockSM: number;
            cellPaddingInlineSM: number;
            footerBg: string;
            headerBg: string;
        };
        Tabs: {
            colorBgSelectedTab: string;
            inkBarColor: string;
            itemColor: string;
            itemHoverColor: string;
            itemUnselectedIconColor: string;
            colorBorderActiveTab: string;
            colorBgUnselectedTab: string;
            colorBgHoverUnselectedTab: string;
            colorBorderContainer: string;
            paddingTabs: number;
        };
        Avatar: {
            colorUserIndicator: string;
        };
        Example: {
            color: string;
        };
    };
};
type tokens = typeof defaultTheme.token;
type components = typeof defaultTheme.components;
declare const PimcoreDefaultTheme: PimcoreThemeConfig;
export { PimcoreDefaultTheme };
declare module 'antd-style' {
    interface ThemeConfig extends PimcoreThemeConfig {
    }
    interface FullToken extends tokens, components {
    }
}
//# sourceMappingURL=default-theme.d.ts.map
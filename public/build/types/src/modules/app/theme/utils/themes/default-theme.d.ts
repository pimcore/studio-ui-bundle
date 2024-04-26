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
import * as testingLibrary from '@testing-library/react';
import { type ReactElement } from 'react';
declare const testingLibaryProps: {
    configure(configDelta: testingLibrary.ConfigFn | Partial<testingLibrary.Config>): void;
    getConfig(): testingLibrary.Config;
    renderHook<Result, Props, Q extends testingLibrary.Queries = typeof testingLibrary.queries, Container extends Element | DocumentFragment = HTMLElement, BaseElement extends Element | DocumentFragment = Container>(render: (initialProps: Props) => Result, options?: testingLibrary.RenderHookOptions<Props, Q, Container, BaseElement> | undefined): testingLibrary.RenderHookResult<Result, Props>;
    cleanup(): void;
    act: typeof import("react-dom/test-utils").act;
    queries: typeof testingLibrary.queries;
    queryHelpers: typeof testingLibrary.queryHelpers;
    within: typeof testingLibrary.getQueriesForElement;
    getByLabelText<T extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined): T;
    getAllByLabelText<T_1 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined): T_1[];
    queryByLabelText<T_2 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined): T_2 | null;
    queryAllByLabelText<T_3 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined): T_3[];
    findByLabelText<T_4 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_4>;
    findAllByLabelText<T_5 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_5[]>;
    getByPlaceholderText<T_6 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_6;
    getAllByPlaceholderText<T_7 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_7[];
    queryByPlaceholderText<T_8 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_8 | null;
    queryAllByPlaceholderText<T_9 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_9[];
    findByPlaceholderText<T_10 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_10>;
    findAllByPlaceholderText<T_11 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_11[]>;
    getByText<T_12 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined): T_12;
    getAllByText<T_13 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined): T_13[];
    queryByText<T_14 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined): T_14 | null;
    queryAllByText<T_15 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined): T_15[];
    findByText<T_16 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_16>;
    findAllByText<T_17 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.SelectorMatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_17[]>;
    getByAltText<T_18 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_18;
    getAllByAltText<T_19 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_19[];
    queryByAltText<T_20 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_20 | null;
    queryAllByAltText<T_21 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_21[];
    findByAltText<T_22 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_22>;
    findAllByAltText<T_23 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_23[]>;
    getByTitle<T_24 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_24;
    getAllByTitle<T_25 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_25[];
    queryByTitle<T_26 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_26 | null;
    queryAllByTitle<T_27 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_27[];
    findByTitle<T_28 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_28>;
    findAllByTitle<T_29 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_29[]>;
    getByDisplayValue<T_30 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_30;
    getAllByDisplayValue<T_31 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_31[];
    queryByDisplayValue<T_32 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_32 | null;
    queryAllByDisplayValue<T_33 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_33[];
    findByDisplayValue<T_34 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_34>;
    findAllByDisplayValue<T_35 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_35[]>;
    getByRole<T_36 extends HTMLElement = HTMLElement>(container: HTMLElement, role: testingLibrary.ByRoleMatcher, options?: testingLibrary.ByRoleOptions | undefined): T_36;
    getAllByRole<T_37 extends HTMLElement = HTMLElement>(container: HTMLElement, role: testingLibrary.ByRoleMatcher, options?: testingLibrary.ByRoleOptions | undefined): T_37[];
    queryByRole<T_38 extends HTMLElement = HTMLElement>(container: HTMLElement, role: testingLibrary.ByRoleMatcher, options?: testingLibrary.ByRoleOptions | undefined): T_38 | null;
    queryAllByRole<T_39 extends HTMLElement = HTMLElement>(container: HTMLElement, role: testingLibrary.ByRoleMatcher, options?: testingLibrary.ByRoleOptions | undefined): T_39[];
    findByRole<T_40 extends HTMLElement = HTMLElement>(container: HTMLElement, role: testingLibrary.ByRoleMatcher, options?: testingLibrary.ByRoleOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_40>;
    findAllByRole<T_41 extends HTMLElement = HTMLElement>(container: HTMLElement, role: testingLibrary.ByRoleMatcher, options?: testingLibrary.ByRoleOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_41[]>;
    getByTestId<T_42 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_42;
    getAllByTestId<T_43 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_43[];
    queryByTestId<T_44 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_44 | null;
    queryAllByTestId<T_45 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined): T_45[];
    findByTestId<T_46 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_46>;
    findAllByTestId<T_47 extends HTMLElement = HTMLElement>(container: HTMLElement, id: testingLibrary.Matcher, options?: testingLibrary.MatcherOptions | undefined, waitForElementOptions?: testingLibrary.waitForOptions | undefined): Promise<T_47[]>;
    getElementError(message: string | null, container: HTMLElement): Error;
    buildQueries<Arguments extends any[]>(queryAllBy: testingLibrary.GetAllBy<Arguments>, getMultipleError: testingLibrary.GetErrorFunction<Arguments>, getMissingError: testingLibrary.GetErrorFunction<Arguments>): testingLibrary.BuiltQueryMethods<Arguments>;
    queryByAttribute: testingLibrary.QueryByAttribute;
    queryAllByAttribute: testingLibrary.AllByAttribute;
    screen: testingLibrary.Screen<typeof testingLibrary.queries>;
    waitFor<T_48>(callback: () => T_48 | Promise<T_48>, options?: testingLibrary.waitForOptions | undefined): Promise<T_48>;
    waitForElementToBeRemoved<T_49>(callback: T_49 | (() => T_49), options?: testingLibrary.waitForOptions | undefined): Promise<void>;
    getDefaultNormalizer(options?: testingLibrary.DefaultNormalizerOptions | undefined): testingLibrary.NormalizerFn;
    getNodeText(node: HTMLElement): string;
    createEvent: testingLibrary.CreateObject & testingLibrary.CreateFunction;
    fireEvent: testingLibrary.FireFunction & testingLibrary.FireObject;
    getQueriesForElement<QueriesToBind extends testingLibrary.Queries = typeof testingLibrary.queries, T_50 extends QueriesToBind = QueriesToBind>(element: HTMLElement, queriesToBind?: T_50 | undefined): testingLibrary.BoundFunctions<T_50>;
    prettyDOM(dom?: Element | HTMLDocument | undefined, maxLength?: number | undefined, options?: testingLibrary.PrettyDOMOptions | undefined): string | false;
    logDOM(dom?: Element | HTMLDocument | undefined, maxLength?: number | undefined, options?: testingLibrary.PrettyDOMOptions | undefined): void;
    prettyFormat: typeof testingLibrary.prettyFormat;
    logRoles(container: HTMLElement, options?: testingLibrary.LogRolesOptions | undefined): string;
    getRoles(container: HTMLElement): {
        [index: string]: HTMLElement[];
    };
    isInaccessible(element: Element): boolean;
    computeHeadingLevel(element: Element): number | undefined;
    getSuggestedQuery(element: HTMLElement, variant?: testingLibrary.Variant | undefined, method?: testingLibrary.Method | undefined): testingLibrary.Suggestion | undefined;
};
declare const render: (ui: ReactElement, options?: Omit<testingLibrary.RenderOptions, 'wrapper'>) => testingLibrary.RenderResult<typeof testingLibrary.queries, HTMLElement, HTMLElement>;
export { testingLibaryProps };
export { render };
//# sourceMappingURL=test-utils.d.ts.map
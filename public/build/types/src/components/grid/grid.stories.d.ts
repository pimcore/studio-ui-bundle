import { type Meta } from '@storybook/react';
declare const config: Meta;
export default config;
interface User {
    firstname: string;
    lastname: string;
    age: number;
}
export declare const _default: {
    args: {
        data: User[];
        columns: ((import("@tanstack/react-table").ColumnDefBase<User, string> & import("@tanstack/react-table").StringHeaderIdentifier) | (import("@tanstack/react-table").ColumnDefBase<User, string> & import("@tanstack/react-table").IdIdentifier<User, string>) | (import("@tanstack/react-table").AccessorKeyColumnDefBase<User, string> & Partial<import("@tanstack/react-table").IdIdentifier<User, string>>) | (import("@tanstack/react-table").ColumnDefBase<User, number> & import("@tanstack/react-table").StringHeaderIdentifier) | (import("@tanstack/react-table").ColumnDefBase<User, number> & import("@tanstack/react-table").IdIdentifier<User, number>) | (import("@tanstack/react-table").AccessorKeyColumnDefBase<User, number> & Partial<import("@tanstack/react-table").IdIdentifier<User, number>>))[];
    };
};
//# sourceMappingURL=grid.stories.d.ts.map
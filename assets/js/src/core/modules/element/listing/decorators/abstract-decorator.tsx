import { SettingsContextProps } from "../abstract/settings/settings-provider";

export type AbstractDecoratorProps = SettingsContextProps;

export type AbstractDecorator = <T = unknown>(props: AbstractDecoratorProps, config?: T) => AbstractDecoratorProps;
export type AbstractDecoratorWithRequiredConfig<T> = (props: AbstractDecoratorProps, config: T) => AbstractDecoratorProps;

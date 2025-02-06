import { SettingsContextProps } from "../abstract/settings/settings-provider";

export interface AbstractDecoratorProps extends SettingsContextProps {};

export type AbstractDecorator<T = unknown> = (props: AbstractDecoratorProps, config?: T) => AbstractDecoratorProps;
export type AbstractDecoratorWithRequiredConfig<T = unknown> = (props: AbstractDecoratorProps, config: T) => AbstractDecoratorProps; ;

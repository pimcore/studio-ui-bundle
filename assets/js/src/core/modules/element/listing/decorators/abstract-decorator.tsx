import { defaultProps } from "../abstract/listing-container";

export type AbstractDecoratorProps = typeof defaultProps;

export type AbstractDecorator = <T = unknown>(props: AbstractDecoratorProps, config?: T) => AbstractDecoratorProps;
export type AbstractDecoratorWithRequiredConfig<T> = (props: AbstractDecoratorProps, config: T) => AbstractDecoratorProps;

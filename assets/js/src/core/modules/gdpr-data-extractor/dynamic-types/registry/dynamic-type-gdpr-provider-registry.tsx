import { DynamicTypeRegistryAbstract } from "@sdk/modules/element";
import { injectable } from "inversify";
import { DynamicTypeAbstractGDPRProvider } from "../definitions/dynamic-type-abstract-gdpr-provider";

@injectable()
export class DynamicTypeGDPRProviderRegistry extends DynamicTypeRegistryAbstract<DynamicTypeAbstractGDPRProvider> { }
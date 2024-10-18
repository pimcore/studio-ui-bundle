
// @todo check for a more generic type when objects are implemented
import { GridColumnConfiguration } from "@Pimcore/modules/asset/asset-api-slice-enhanced";
import { ReactElement } from "react";
import { DynamicTypeAbstract } from "../../registry/dynamic-type-registry-abstract";

export interface AbstractFieldFilterDefinition {
  column: GridColumnConfiguration
}

export abstract class DynamicTypeFieldFilterAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  abstract getFieldFilterComponent(props: AbstractFieldFilterDefinition): ReactElement<AbstractFieldFilterDefinition>
}

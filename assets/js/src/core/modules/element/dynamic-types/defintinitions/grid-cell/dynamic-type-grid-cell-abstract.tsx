
// @todo check for a more generic type when objects are implemented
import { GridColumnConfiguration } from "@Pimcore/modules/asset/asset-api-slice-enhanced";
import { ReactElement } from "react";
import { DynamicTypeAbstract } from "../../registry/dynamic-type-registry-abstract";

export interface AbstractGridCellDefinition {
  column: GridColumnConfiguration
}

export abstract class DynamicTypeCellColumnAbstract extends DynamicTypeAbstract {
  abstract readonly id: string
  abstract getGridColumnComponent(props: AbstractGridCellDefinition): ReactElement<AbstractGridCellDefinition>
}

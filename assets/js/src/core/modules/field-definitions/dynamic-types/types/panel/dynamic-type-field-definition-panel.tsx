import { DynamicTypeFieldDefinitionLayoutAbstract } from "@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/layout/dynamic-type-field-defintion-layout-abstract";

export class DynamicTypeFieldDefinitionPanel extends DynamicTypeFieldDefinitionLayoutAbstract {
  id: string = 'panel';
  
  getGroup(): string[] {
    return [...super.getGroup(), 'panel'];
  }

  getTags(): string[] {
    return [...super.getTags(), `root`];
  }
}

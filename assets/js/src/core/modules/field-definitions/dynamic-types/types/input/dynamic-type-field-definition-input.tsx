import { DynamicTypeFieldDefinitionDataAbstract } from "@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/data/dynamic-type-field-defintion-data-abstract";
import { ElementIcon } from "@sdk/modules/widget-manager";

export class DynamicTypeFieldDefinitionInput extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'input';

  getIcon(): ElementIcon {
    return { type: 'name', value: 'text-field' }
  }
  
  getGroup(): string[] {
    return [...super.getGroup(), 'text'];
  }
}

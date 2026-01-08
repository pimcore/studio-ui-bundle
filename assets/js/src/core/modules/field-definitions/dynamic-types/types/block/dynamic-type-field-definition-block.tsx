import { FieldDefinitionContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { DynamicTypeFieldDefinitionDataAbstract } from "@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/data/dynamic-type-field-defintion-data-abstract";
import { ElementIcon } from "@sdk/modules/widget-manager";

export class DynamicTypeFieldDefinitionBlock extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'block';

  getIcon(): ElementIcon {
    return { type: 'name', value: 'alert' }
  }

  protected getAllowedChildTags(props: FieldDefinitionContext): string[] {
    return [...super.getAllowedChildTags(props), 'group:layout', 'group:data'];
  }

  protected getDisallowedRecursiveChildTags(props: FieldDefinitionContext): string[] {
    // @todo check other types here as well
    return [...super.getDisallowedRecursiveChildTags(props), 'block'];
  }
  
  getGroup(): string[] {
    return [...super.getGroup(), 'structured'];
  }
}

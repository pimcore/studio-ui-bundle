import { DynamicTypeFieldDefinitionAbstract, FieldDefinitionDataAbstract, FieldDefinitionFormContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { FieldDefinitionLayoutFormFields } from "@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields";
import React from "react";

export interface FieldDefinitionLayout extends FieldDefinitionDataAbstract {
  name: string;
  title: string;
  region: string;
}

export abstract class DynamicTypeFieldDefinitionLayoutAbstract extends DynamicTypeFieldDefinitionAbstract {
  getAllowedChildTags(): string[] {
    return [...super.getAllowedChildTags(), 'layout', 'data'];
  }

  getTags(): string[] {
    return [...super.getTags(), `layout`];
  }

  getGroup(): string[] {
    return ['layout'];
  }

  getDefaultData(): FieldDefinitionLayout {
    return {
      fieldtype: this.id,
      name: 'Panel',
      title: '',
      region: '',
    };
  }

  getFormFields(context: FieldDefinitionFormContext): React.JSX.Element {
    return (
      <FieldDefinitionLayoutFormFields context={context} />
    )
  }
}

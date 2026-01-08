import { DynamicTypeFieldDefinitionAbstract, FieldDefinitionDataAbstract, FieldDefinitionContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { FieldDefinitionLayoutFormFields } from "@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields";
import React from "react";

export interface FieldDefinitionLayout extends FieldDefinitionDataAbstract {
  name: string;
  title: string;
  region: string;
}

export abstract class DynamicTypeFieldDefinitionLayoutAbstract extends DynamicTypeFieldDefinitionAbstract {
  protected getAllowedChildTags(props: FieldDefinitionContext): string[] {
    return [...super.getAllowedChildTags(props), 'group:layout', 'group:data'];
  }

  getTags(props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), `group:layout`];
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

  getFormFields(context: FieldDefinitionContext): React.JSX.Element {
    return (
      <FieldDefinitionLayoutFormFields context={context} />
    )
  }
}

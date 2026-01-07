import { DynamicTypeFieldDefinitionAbstract, FieldDefinitionDataAbstract, FieldDefinitionFormContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { FieldDefinitionDataFormFields } from "@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields";
import React from "react";

export interface FieldDefinitionData extends FieldDefinitionDataAbstract {
  name: string;
  title: string;
  tooltip: string;
}

export abstract class DynamicTypeFieldDefinitionDataAbstract extends DynamicTypeFieldDefinitionAbstract {
  getTags(): string[] {
    return [...super.getTags(), `data`];
  }

  getGroup(): string[] {
    return ['data'];
  }

  getDefaultData(): FieldDefinitionData {
    return {
      name: '',
      title: '',
      tooltip: 'Some predefined tooltip',
      fieldtype: this.id,
    };
  }

  isValid(data: FieldDefinitionData): boolean {
    return data.name.trim().length > 0;
  }

  getFormFields(context: FieldDefinitionFormContext): React.JSX.Element {
    return (
      <FieldDefinitionDataFormFields context={context} />
    )
  }
}

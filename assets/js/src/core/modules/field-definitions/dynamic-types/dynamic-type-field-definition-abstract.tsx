import React from "react";
import { IClassDefinitionLayoutContext } from "@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider";
import { DynamicTypeAbstract } from "@sdk/modules/element";
import { ElementIcon } from "@sdk/modules/widget-manager";

export interface FieldDefinitionDataAbstract extends Record<string, any> {}

export interface FieldDefinitionFormContext extends Record<string, any> {
  area: string[],
  path: string[],
  fieldDefinitions: IClassDefinitionLayoutContext['fieldDefinitions'],
}

export abstract class DynamicTypeFieldDefinitionAbstract extends DynamicTypeAbstract {
  abstract getGroup(): string[]
  
  getIcon(): ElementIcon {
    return { type: 'name', value: 'questionmark' }
  }

  getTags(): string[] {
    return [this.id]
  }

  getAllowedChildTags(): string[] {
    return []
  }

  getDisallowedRecursiveChildTags(): string[] {
    return []
  }

  getConvertibleTags(): string[] {
    return []
  }

  isValid (data: FieldDefinitionDataAbstract): boolean {
    return true
  }

  abstract getDefaultData(): FieldDefinitionDataAbstract

  abstract getFormFields(context: FieldDefinitionFormContext): React.JSX.Element

  getAdditionalFormFields(context: FieldDefinitionFormContext): React.JSX.Element | null {
    return null;
  }
}

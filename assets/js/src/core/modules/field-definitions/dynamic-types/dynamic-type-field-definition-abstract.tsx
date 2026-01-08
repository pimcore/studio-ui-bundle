import React from "react";
import { IClassDefinitionLayoutContext } from "@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider";
import { DynamicTypeAbstract } from "@sdk/modules/element";
import { ElementIcon } from "@sdk/modules/widget-manager";
import { container, serviceIds } from "@sdk/app";
import { DynamicTypeFieldDefinitionRegistry } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry";

export interface FieldDefinitionDataAbstract extends Record<string, any> {}

export interface FieldDefinitionContext extends Record<string, any> {
  area: string[],
  path: string[],
  fieldDefinitions: IClassDefinitionLayoutContext['fieldDefinitions'],
}

export abstract class DynamicTypeFieldDefinitionAbstract extends DynamicTypeAbstract {
  abstract getGroup(): string[]
  
  getIcon(): ElementIcon {
    return { type: 'name', value: 'questionmark' }
  }

  getTags(props: FieldDefinitionContext): string[] {
    return [this.id]
  }

  protected getAllowedChildTags(props: FieldDefinitionContext): string[] {
    return []
  }

  protected getDisallowedRecursiveChildTags(props: FieldDefinitionContext): string[] {
    return []
  }

  getConvertibleTags(props: FieldDefinitionContext): string[] {
    return []
  }

  getValidChildTags(props: FieldDefinitionContext): string[] {
    const allowedChildTags = this.getAllowedChildTags(props);
    const validChildTags = this.computeValidTags(allowedChildTags, props);
    return validChildTags;
  }

  getValidConvertibleTags(props: FieldDefinitionContext): string[] {
    const convertibleTags = this.getConvertibleTags(props);
    const validConvertibleTags = this.computeValidTags(convertibleTags, props).filter(tag => tag !== this.id);
    return validConvertibleTags;
  }

  isValid (data: FieldDefinitionDataAbstract, context: FieldDefinitionContext): boolean {
    return true
  }

  abstract getDefaultData(context: FieldDefinitionContext): FieldDefinitionDataAbstract

  abstract getFormFields(context: FieldDefinitionContext): React.JSX.Element

  getAdditionalFormFields(context: FieldDefinitionContext): React.JSX.Element | null {
    return null;
  }

  protected computeValidTags(tags: string[], context: FieldDefinitionContext): string[] {
    const { path, area, fieldDefinitions } = context;
    const usedFieldDefinitions = path.map((pathItem) => fieldDefinitions[pathItem]);
    const fieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

    const blockedTags: string[] = [];
    usedFieldDefinitions.forEach((usedFieldDefinition) => {
      if (usedFieldDefinition) {
        const disallowedTags = fieldDefinitionRegistry.getDynamicType(usedFieldDefinition.fieldtype, false)?.getDisallowedRecursiveChildTags({
          ...context,
        }) ?? [];

        blockedTags.push(...disallowedTags);
      }
    });

    const allowedChildTags = tags;
    const resolvedBlockedTags = fieldDefinitionRegistry.getTypesByTags(blockedTags, context).map(type => type.id);
    const resolvedAllowedChildTags = fieldDefinitionRegistry.getTypesByTags(allowedChildTags, context).map(type => type.id);
    const validChildTags = resolvedAllowedChildTags.filter(tag => !resolvedBlockedTags.includes(tag));

    return validChildTags;
  }
}

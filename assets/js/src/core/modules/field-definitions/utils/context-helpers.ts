import { FieldDefinition } from "@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider";
import { FieldDefinitionContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract"

export const getParent = <T extends FieldDefinition = FieldDefinition>(context: FieldDefinitionContext): T | undefined => {
  const { fieldDefinitions, path } = context;
  const definition = fieldDefinitions[path[path.length - 2]]
  return definition as T | undefined;
}

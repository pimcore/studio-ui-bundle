import { moduleSystem } from "@Pimcore/app/module-system/module-system";
import { DynamicTypeFieldDefinitionRegistry } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry";
import { container } from "@sdk/app";

moduleSystem.registerModule({
  onInit: () => {
    const fieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>('DynamicTypes/FieldDefinitionRegistry');

    fieldDefinitionRegistry.registerDynamicType(container.get('DynamicTypes/FieldDefinition/Input'));
    fieldDefinitionRegistry.registerDynamicType(container.get('DynamicTypes/FieldDefinition/Panel'));
  }
})

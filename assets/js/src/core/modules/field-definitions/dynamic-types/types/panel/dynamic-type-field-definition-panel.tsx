import { FieldDefinitionContext } from "@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract";
import { DynamicTypeFieldDefinitionLayoutAbstract } from "@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/layout/dynamic-type-field-defintion-layout-abstract";
import { FieldDefinitionPanelFormFields } from "@Pimcore/modules/field-definitions/dynamic-types/types/panel/field-definition-panel-form-fields";
import React from "react";

export class DynamicTypeFieldDefinitionPanel extends DynamicTypeFieldDefinitionLayoutAbstract {
  id: string = 'panel';
  
  getGroup(): string[] {
    return [...super.getGroup(), 'panel'];
  }

  getTags(props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), `group:root`];
  }

  getFormFields(context: FieldDefinitionContext): React.JSX.Element {
    return (<>
      {super.getFormFields(context)}
      <FieldDefinitionPanelFormFields context={context} />
    </>);
  }
}

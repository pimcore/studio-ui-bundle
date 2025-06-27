import React, { ReactElement } from "react";
import { DynamicTypePipelineAbstract } from "../../../../dynamic-type-pipeline-abstract";
import { injectable } from "inversify";
import { DynamicTypePipelineGridSourceFieldsRelationFieldComponent } from "../../components/relation-field/relation-field";

@injectable()
export class DynamicTypePipelineGridSourceFieldsRelationField extends DynamicTypePipelineAbstract {
  readonly id = 'relation-field';

  getComponent(): ReactElement {
    return (
      <DynamicTypePipelineGridSourceFieldsRelationFieldComponent />
    );
  }
}

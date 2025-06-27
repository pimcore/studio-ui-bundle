import React, { ReactElement } from "react";
import { DynamicTypePipelineAbstract } from "../../../../dynamic-type-pipeline-abstract";
import { injectable } from "inversify";
import { DynamicTypePipelineGridSourceFieldsSimpleFieldComponent } from "../../components/simple-field/simple-field";

@injectable()
export class DynamicTypePipelineGridSourceFieldsSimpleField extends DynamicTypePipelineAbstract {
  readonly id = 'simple-field';

  getComponent(): ReactElement {
    return (
      <DynamicTypePipelineGridSourceFieldsSimpleFieldComponent />
    );
  }
}

import React, { ReactElement } from "react";
import { DynamicTypePipelineAbstract } from "../../../../dynamic-type-pipeline-abstract";
import { DynamicTypePipelineGridSourceFieldsTextComponent } from "../../components/text/text";
import { injectable } from "inversify";

@injectable()
export class DynamicTypePipelineGridSourceFieldsText extends DynamicTypePipelineAbstract {
  readonly id = 'text';

  getComponent(): ReactElement {
    return (
      <DynamicTypePipelineGridSourceFieldsTextComponent />
    );
  }
}

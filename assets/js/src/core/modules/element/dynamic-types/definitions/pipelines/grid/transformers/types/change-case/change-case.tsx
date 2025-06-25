import React, { ReactElement } from "react";
import { DynamicTypePipelineAbstract } from "../../../../dynamic-type-pipeline-abstract";
import { DynamicTypePipelineGridTransformersChangeCaseComponent } from "../../components/change-case/change-case";
import { injectable } from "inversify";

@injectable()
export class DynamicTypePipelineGridTransformersChangeCase extends DynamicTypePipelineAbstract {
  readonly id = 'ChangeCase';

  getComponent(): ReactElement {
    return (
      <DynamicTypePipelineGridTransformersChangeCaseComponent />
    );
  }
}

import React, { ReactElement } from "react";
import { DynamicTypePipelineAbstract } from "../../../../dynamic-type-pipeline-abstract";
import { injectable } from "inversify";
import { DynamicTypePipelineGridTransformersCombineComponent } from "../../components/combine/combine";

@injectable()
export class DynamicTypePipelineGridTransformersCombine extends DynamicTypePipelineAbstract {
  readonly id = 'combine';

  getComponent(): ReactElement {
    return (
      <DynamicTypePipelineGridTransformersCombineComponent />
    );
  }
}

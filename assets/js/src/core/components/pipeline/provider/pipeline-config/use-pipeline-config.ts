import { useContext } from "react"
import { PipelineConfigProviderContext } from "./pipeline-config-provider"

export interface UsePipelineConfigReturn {
  config: PipelineConfigProviderContext['config']
}

export const usePipelineConfig = () => {
  const context = useContext(PipelineConfigProviderContext);

  if (!context) {
    throw new Error("usePipelineConfig must be used within a PipelineConfigProvider")
  }

  return {
    config: context.config
  } as UsePipelineConfigReturn
}

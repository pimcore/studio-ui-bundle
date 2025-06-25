import React from "react"
import { Box } from "@Pimcore/components/box/box"

export interface PipelineItemCustomProps {
  children: React.ReactNode
  padded?: boolean
}

export const PipelineItemCustom = ({children, padded = true}: PipelineItemCustomProps): React.JSX.Element => {
  return (
    <Box padding={padded ? 'mini' : 'none'}>
      {children}
    </Box>
  )
}

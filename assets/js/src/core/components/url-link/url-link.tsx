import { Box } from "@sdk/components"
import React from "react"

interface UrlLinkProps {
  value?: string
  text?: string
}


export const UrlLink = ({ value, text }: UrlLinkProps): React.JSX.Element | null => {
  if (value === undefined || value === '') {
    return null
  }

  return (
    <Box padding={{ x: 'mini' }}>
      <a
        href={value}
        rel="noopener noreferrer"
        target="_blank"
      >
        {text ?? value}
      </a>
    </Box>
  )
}
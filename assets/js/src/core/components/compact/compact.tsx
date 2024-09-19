import react from 'react'
import { Space,  } from 'antd'
import { SpaceCompactProps } from 'antd/es/space/Compact'
import React from 'react'

interface CompactProps extends SpaceCompactProps {
}

export const Compact = (props: CompactProps): React.JSX.Element => {
  return (
    <Space.Compact {...props} />
  )
}

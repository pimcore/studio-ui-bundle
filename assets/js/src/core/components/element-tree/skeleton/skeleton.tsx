/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { Skeleton as AntdSkeleton } from 'antd'
import { motion } from 'framer-motion'
import { Box } from '@Pimcore/components/box/box'
import { Space } from '@Pimcore/components/space/space'

interface SkeletonProps {
  style?: React.CSSProperties
}

export const Skeleton = (props: SkeletonProps): React.JSX.Element => {
  return (
    <motion.div
      animate={ { opacity: 1 } }
      initial={ { opacity: 0 } }
      { ...props }
    >
      <Box padding={ { top: 'extra-small', bottom: 'extra-small', right: 'extra-small' } }>
        <Space
          className='w-full'
          direction='vertical'
          size='extra-small'
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <AntdSkeleton.Input
              active
              block
              key={ index }
              style={ { height: 16 } }
            />
          ))}
        </Space>
      </Box>
    </motion.div>
  )
}

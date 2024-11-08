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
import { ObjectComponent } from './object-component'
import { Form } from '@Pimcore/components/form/form'
import { Button, ConfigProvider } from 'antd'
import { type DataObjectGetLayoutByIdApiResponse } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useCssContainer } from '@Pimcore/utils/hooks/use-css-container/use-css-container'
import { regionCssContainer } from '@Pimcore/components/region/region.styles'

interface RootComponentProps {
  layout: DataObjectGetLayoutByIdApiResponse
}

export const RootComponent = ({ layout }: RootComponentProps): React.JSX.Element => {
  const { styleDefinition } = useCssContainer(regionCssContainer)

  return (
    <ConfigProvider theme={ {
      components: {
        Form: {
          itemMarginBottom: 0
        }
      }
    } }
    >
      <div className={ styleDefinition.styles.container }>
        <Form
          layout='vertical'
          onFinish={ onFinish }
        >
          <ObjectComponent { ...layout } />

          <Form.Item style={ { margin: 12 } }>
            <Button
              htmlType="submit"
              type="primary"
            >Test submission</Button>
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  )

  function onFinish (values: any): void {
    console.log(values)
  }
}

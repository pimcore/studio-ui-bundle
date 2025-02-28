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

import { type FormItemProps, type Form } from 'antd'
import React, { useMemo } from 'react'
import { useLocalizedFields } from '../provider/localized-fields-provider/use-localized-fields'
import { isArray } from 'lodash'
import { Text } from '@Pimcore/components/text/text'

export const withLocalizedFieldsLocale = (Component: typeof Form.Item): typeof Form.Item => {
  const FormItemWithLocalizedFieldsLocale = (props: FormItemProps): React.JSX.Element => {
    const context = useLocalizedFields()

    return useMemo(() => {
      if (context === undefined) {
        return <Component { ...props } />
      }

      const { locales } = context
      const { name, label, ...baseProps } = props
      const newName = [...(isArray(name) ? name : [name]), locales[0]]
      const newLabel = (
        <>
          {label} <Text type='secondary'>({locales[0].toUpperCase()})</Text>
        </>
      )

      return (
        <Component
          { ...baseProps }
          label={ newLabel }
          name={ newName }
        />
      )
    }, [context, props])
  }

  const NewFormItem = FormItemWithLocalizedFieldsLocale as typeof Form.Item
  NewFormItem.useStatus = Component.useStatus
  return NewFormItem
}

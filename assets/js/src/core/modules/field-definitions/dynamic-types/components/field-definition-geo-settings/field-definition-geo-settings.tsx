/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form, Input, InputNumber } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const FieldDefinitionGeoSettings = (): React.JSX.Element => {
  const { t } = useTranslation()
  return (
    <><Form.Item
      label={ t('latitude') }
      name="lat"
      >
      <InputNumber
        min={ 0 }
        precision={ 8 }
        step={ 0.01 }
      />
    </Form.Item><Form.Item
      label={ t('longitude') }
      name="lng"
                >
      <InputNumber
        min={ 0 }
        precision={ 8 }
        step={ 0.01 }
      />
    </Form.Item><Form.Item
      label={ t('zoom-level') }
      name="zoom"
                >
      <InputNumber
        min={ 1 }
        precision={ 0 }
      />
    </Form.Item><Form.Item
      label={ t('width') }
      name="width"
      tooltip={ t('width-tooltip') }
                >
      <Input />
    </Form.Item><Form.Item
      label={ t('height') }
      name="height"
      tooltip={ t('height-tooltip') }
                >
      <Input />
    </Form.Item></>

  )
}

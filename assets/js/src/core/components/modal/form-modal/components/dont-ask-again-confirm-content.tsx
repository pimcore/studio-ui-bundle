/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Switch } from 'antd'
import { useTranslation } from 'react-i18next'

export function DontAskAgainSwitch (props: { dontAskAgainRef: React.MutableRefObject<boolean> }): React.JSX.Element {
  const { dontAskAgainRef } = props
  const { t } = useTranslation()

  return (
    <div style={ { display: 'flex', alignItems: 'center', gap: '8px' } }>
      <Switch
        defaultChecked={ false }
        onChange={ (checked) => {
          dontAskAgainRef.current = checked
        } }
        size="small"
      />
      <span>{t('dont-ask-again')}</span>
    </div>
  )
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useLazyPingActionQuery } from '@Pimcore/modules/app/settings/settings-slice-enhanced'

import { isNil } from 'lodash'

export const useSessionPing = (): void => {
  const { session_gc_maxlifetime: sessionGcMaxLifetime } = useSettings()
  const [triggerPing] = useLazyPingActionQuery()

  useEffect(() => {
    if (isNil(sessionGcMaxLifetime)) {
      return
    }

    const intervalTime = (Number(sessionGcMaxLifetime) - 60) * 1000

    const interval = setInterval(() => {
      void triggerPing()
    }, intervalTime)

    return () => {
      clearInterval(interval)
    }
  }, [sessionGcMaxLifetime, triggerPing])
}

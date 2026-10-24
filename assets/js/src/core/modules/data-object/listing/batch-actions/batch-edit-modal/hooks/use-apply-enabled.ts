/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useState } from 'react'
import { Form } from '@Pimcore/components/form/form'
import { type formInstanceType } from '@Pimcore/components/form/use-form'

export interface UseApplyEnabledReturn {
  applyEnabled: boolean
  // Re-checks the form once a row's field has registered.
  onRowMount: () => void
}

// Rows with a required choice (e.g. Published: Publish / Unpublish) keep "Apply changes" disabled until all are set.
// A new row's field registers after the rows changed and without changing a form value, so its mount re-triggers the check.
export const useApplyEnabled = (form: formInstanceType, rows: unknown): UseApplyEnabledReturn => {
  const [applyEnabled, setApplyEnabled] = useState<boolean>(true)
  const [mountedRows, setMountedRows] = useState<number>(0)
  const formValues = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true })
      .then(() => { setApplyEnabled(true) })
      .catch((error: { errorFields?: unknown[], outOfDate?: boolean }) => {
        // A validation superseded by a newer run rejects without errors; the newer run sets the state.
        if (error.outOfDate !== true || (error.errorFields?.length ?? 0) > 0) {
          setApplyEnabled(false)
        }
      })
  }, [form, formValues, rows, mountedRows])

  const onRowMount = useCallback(() => { setMountedRows((count) => count + 1) }, [])

  return { applyEnabled, onRowMount }
}

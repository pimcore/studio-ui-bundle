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

import React, { createContext, useContext, useMemo } from 'react'
import { type FormInstance } from 'antd'
import { useForm } from 'antd/es/form/Form'

interface EditFormContextProps {
  form: FormInstance
}

const EditFormContext = createContext<EditFormContextProps | undefined>(undefined)

export const useEditFormContext = (): EditFormContextProps => {
  const context = useContext(EditFormContext)
  if (context === undefined) {
    throw new Error('useEditFormContext must be used within a FormProvider')
  }
  return context
}

export const EditFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form] = useForm()
  const value = useMemo(() => ({ form }), [form])

  return (
    <EditFormContext.Provider value={ value }>
      {children}
    </EditFormContext.Provider>
  )
}

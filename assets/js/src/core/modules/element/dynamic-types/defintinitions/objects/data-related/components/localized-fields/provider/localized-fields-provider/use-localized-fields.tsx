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

import { useContext } from 'react'
import { type ILocalizedFieldsContext, LocalizedFieldsContext } from './localized-fields-provider'

export interface UseLocalizedFieldsReturn extends ILocalizedFieldsContext {}

export const useLocalizedFields = (): UseLocalizedFieldsReturn | undefined => {
  const context = useContext(LocalizedFieldsContext)

  return context
}

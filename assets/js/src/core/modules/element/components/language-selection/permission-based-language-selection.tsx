/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { LanguageSelection as BaseLanguageSelection } from '@Pimcore/components/language-selection/language-selection'
import React from 'react'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection';
import { useElementContext } from '../../hooks/use-element-context';
import { useElementDraft } from '../../hooks/use-element-draft';

export const PermissionBasedLanguageSelection = (): React.JSX.Element => {
  const user = useUser();
  const elementContext = useElementContext();
  const elementDraft = useElementDraft(elementContext.id, elementContext.elementType)
  const availableLanguages: string[] = [];
  const { currentLanguage, setCurrentLanguage } = useLanguageSelection()

  if ('permissions' in elementDraft) {
    const permissions: Record<string, any> = elementDraft.permissions as Record<string, any>;
    if (permissions.localizedView) {
      availableLanguages.push(...permissions.localizedView.split(','));
    }
  } else {
    availableLanguages.push(...(Array.isArray(user.contentLanguages) ? user.contentLanguages : []))
  }

  return (
    <BaseLanguageSelection
      languages={ availableLanguages }
      onSelectLanguage={ setCurrentLanguage }
      selectedLanguage={ currentLanguage }
    />
  )
}

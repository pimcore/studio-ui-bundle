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
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { type IUseShowMoreReturn } from '@Pimcore/modules/reports/reports-view/components/report-chart/hooks/use-show-more'

interface IShowMoreBtnProps {
  isExpanded: IUseShowMoreReturn<any>['isExpanded']
  toggle: IUseShowMoreReturn<any>['toggle']
}

export const ShowMoreBtn = ({ isExpanded, toggle }: IShowMoreBtnProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Flex
      className="m-t-mini"
      justify="center"
    >
      <IconTextButton
        icon={ { value: isExpanded ? 'chevron-up' : 'chevron-down' } }
        iconPlacement="right"
        onClick={ toggle }
        type="link"
      >
        {isExpanded ? t('reports.show-fewer-labels') : t('reports.show-all-labels')}
      </IconTextButton>
    </Flex>
  )
}

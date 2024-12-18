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

/* eslint-disable max-lines */

import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type IconLibrary } from './services/icon-library'

import attachment from '../assets/icons/attachment.svg'
import autoSave from '../assets/icons/auto-save.svg'
import bookmark from '../assets/icons/bookmark.svg'
import calendar from '../assets/icons/calendar.svg'
import chevronDown from '../assets/icons/chevron-down.svg'
import chevronLeft from '../assets/icons/chevron-left.svg'
import chevronRight from '../assets/icons/chevron-right.svg'
import chevronSelectorHorizontal from '../assets/icons/chevron-selector-horizontal.svg'
import chevronUp from '../assets/icons/chevron-up.svg'
import close from '../assets/icons/close.svg'
import columns from '../assets/icons/columns.svg'
import copilot from '../assets/icons/copilot.svg'
import dashboard from '../assets/icons/dashboard.svg'
import details from '../assets/icons/details.svg'
import doubleArrowDown from '../assets/icons/double-arrow-down.svg'
import doubleArrowLeft from '../assets/icons/double-arrow-left.svg'
import doubleArrowRight from '../assets/icons/double-arrow-right.svg'
import doubleArrowUp from '../assets/icons/double-arrow-up.svg'
import draft from '../assets/icons/draft.svg'
import dragOption from '../assets/icons/drag-option.svg'
import dropTarget from '../assets/icons/drop-target.svg'
import edit from '../assets/icons/edit.svg'
import expand from '../assets/icons/expand.svg'
import eyeOff from '../assets/icons/eye-off.svg'
import eye from '../assets/icons/eye.svg'
import favorites from '../assets/icons/favorites.svg'
import filter from '../assets/icons/filter.svg'
import flipForward from '../assets/icons/flip-forward.svg'
import graph from '../assets/icons/graph.svg'
import heading from '../assets/icons/heading.svg'
import inheritanceBroken from '../assets/icons/inheritance-broken.svg'
import inheritance from '../assets/icons/inheritance.svg'
import layout from '../assets/icons/layout.svg'
import list from '../assets/icons/list.svg'
import loading from '../assets/icons/loading.svg'
import longText from '../assets/icons/long-text.svg'
import mailAnswer from '../assets/icons/mail-answer.svg'
import menu from '../assets/icons/menu.svg'
import minusSquare from '../assets/icons/minus-square.svg'
import more from '../assets/icons/more.svg'
import notification from '../assets/icons/notification.svg'
import openFolder from '../assets/icons/open-folder.svg'
import personalUser from '../assets/icons/personal-user.svg'
import pieChart from '../assets/icons/pie-chart.svg'
import pin from '../assets/icons/pin.svg'
import pined from '../assets/icons/pined.svg'
import plusSquare from '../assets/icons/plus-square.svg'
import published from '../assets/icons/published.svg'
import refresh from '../assets/icons/refresh.svg'
import requiredBy from '../assets/icons/required-by.svg'
import requires from '../assets/icons/requires.svg'
import reverse from '../assets/icons/reverse.svg'
import search from '../assets/icons/search.svg'
import share from '../assets/icons/share.svg'
import sharedUsers from '../assets/icons/shared-users.svg'
import shield from '../assets/icons/shield.svg'
import style from '../assets/icons/style.svg'
import tag from '../assets/icons/tag.svg'
import target from '../assets/icons/target.svg'
import textField from '../assets/icons/text-field.svg'
import trash from '../assets/icons/trash.svg'
import user from '../assets/icons/user.svg'

moduleSystem.registerModule({
  onInit: () => {
    const iconLibrary = container.get<IconLibrary>(serviceIds.iconLibrary)
    iconLibrary.register({
      name: 'attachment',
      component: attachment
    })
    iconLibrary.register({
      name: 'auto-save',
      component: autoSave
    })
    iconLibrary.register({
      name: 'bookmark',
      component: bookmark
    })
    iconLibrary.register({
      name: 'calendar',
      component: calendar
    })
    iconLibrary.register({
      name: 'chevron-down',
      component: chevronDown
    })
    iconLibrary.register({
      name: 'chevron-left',
      component: chevronLeft
    })
    iconLibrary.register({
      name: 'chevron-right',
      component: chevronRight
    })
    iconLibrary.register({
      name: 'chevron-selector-horizontal',
      component: chevronSelectorHorizontal
    })
    iconLibrary.register({
      name: 'chevron-up',
      component: chevronUp
    })
    iconLibrary.register({
      name: 'close',
      component: close
    })
    iconLibrary.register({
      name: 'columns',
      component: columns
    })
    iconLibrary.register({
      name: 'copilot',
      component: copilot
    })
    iconLibrary.register({
      name: 'dashboard',
      component: dashboard
    })
    iconLibrary.register({
      name: 'details',
      component: details
    })
    iconLibrary.register({
      name: 'double-arrow-down',
      component: doubleArrowDown
    })
    iconLibrary.register({
      name: 'double-arrow-left',
      component: doubleArrowLeft
    })
    iconLibrary.register({
      name: 'double-arrow-right',
      component: doubleArrowRight
    })
    iconLibrary.register({
      name: 'double-arrow-up',
      component: doubleArrowUp
    })
    iconLibrary.register({
      name: 'draft',
      component: draft
    })
    iconLibrary.register({
      name: 'drag-option',
      component: dragOption
    })
    iconLibrary.register({
      name: 'drop-target',
      component: dropTarget
    })
    iconLibrary.register({
      name: 'edit',
      component: edit
    })
    iconLibrary.register({
      name: 'expand',
      component: expand
    })
    iconLibrary.register({
      name: 'eye-off',
      component: eyeOff
    })
    iconLibrary.register({
      name: 'eye',
      component: eye
    })
    iconLibrary.register({
      name: 'favorites',
      component: favorites
    })
    iconLibrary.register({
      name: 'filter',
      component: filter
    })
    iconLibrary.register({
      name: 'flip-forward',
      component: flipForward
    })
    iconLibrary.register({
      name: 'graph',
      component: graph
    })
    iconLibrary.register({
      name: 'heading',
      component: heading
    })
    iconLibrary.register({
      name: 'inheritance-broken',
      component: inheritanceBroken
    })
    iconLibrary.register({
      name: 'inheritance',
      component: inheritance
    })
    iconLibrary.register({
      name: 'layout',
      component: layout
    })
    iconLibrary.register({
      name: 'list',
      component: list
    })
    iconLibrary.register({
      name: 'loading',
      component: loading
    })
    iconLibrary.register({
      name: 'long-text',
      component: longText
    })
    iconLibrary.register({
      name: 'mail-answer',
      component: mailAnswer
    })
    iconLibrary.register({
      name: 'menu',
      component: menu
    })
    iconLibrary.register({
      name: 'minus-square',
      component: minusSquare
    })
    iconLibrary.register({
      name: 'more',
      component: more
    })
    iconLibrary.register({
      name: 'notification',
      component: notification
    })
    iconLibrary.register({
      name: 'open-folder',
      component: openFolder
    })
    iconLibrary.register({
      name: 'personal-user',
      component: personalUser
    })
    iconLibrary.register({
      name: 'pie-chart',
      component: pieChart
    })
    iconLibrary.register({
      name: 'pin',
      component: pin
    })
    iconLibrary.register({
      name: 'pined',
      component: pined
    })
    iconLibrary.register({
      name: 'plus-square',
      component: plusSquare
    })
    iconLibrary.register({
      name: 'published',
      component: published
    })
    iconLibrary.register({
      name: 'refresh',
      component: refresh
    })
    iconLibrary.register({
      name: 'required-by',
      component: requiredBy
    })
    iconLibrary.register({
      name: 'requires',
      component: requires
    })
    iconLibrary.register({
      name: 'reverse',
      component: reverse
    })
    iconLibrary.register({
      name: 'search',
      component: search
    })
    iconLibrary.register({
      name: 'share',
      component: share
    })
    iconLibrary.register({
      name: 'shared-users',
      component: sharedUsers
    })
    iconLibrary.register({
      name: 'shield',
      component: shield
    })
    iconLibrary.register({
      name: 'style',
      component: style
    })
    iconLibrary.register({
      name: 'tag',
      component: tag
    })
    iconLibrary.register({
      name: 'target',
      component: target
    })
    iconLibrary.register({
      name: 'text-field',
      component: textField
    })
    iconLibrary.register({
      name: 'trash',
      component: trash
    })
    iconLibrary.register({
      name: 'user',
      component: user
    })
  }
})

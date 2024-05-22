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

import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { serviceIds } from '@Pimcore/app/config/services'
import { type IconLibrary } from './services/icon-library'
import camera from '@Pimcore/assets/icons/camera.inline.svg'
import folder from '@Pimcore/assets/icons/folder.inline.svg'
import widgetDefault from '@Pimcore/assets/icons/widget-default.inline.svg'
import chevronUp from '@Pimcore/assets/icons/chevron-up.inline.svg'
import chevronUpSmall from '@Pimcore/assets/icons/chevron-up-small.inline.svg'
import chevronDownSmall from '@Pimcore/assets/icons/chevron-down-small.inline.svg'
import chevronUpWide from '@Pimcore/assets/icons/chevron-up-wide.inline.svg'
import chevronDownWide from '@Pimcore/assets/icons/chevron-down-wide.inline.svg'
import home from '@Pimcore/assets/icons/home.inline.svg'
import refresh from '@Pimcore/assets/icons/refresh.inline.svg'
import iconTools from '@Pimcore/assets/icons/icon-tools.inline.svg'
import image05 from '@Pimcore/assets/icons/image-05.inline.svg'
import edit from '@Pimcore/assets/icons/edit.inline.svg'
import dataSheet from '@Pimcore/assets/icons/data-sheet.inline.svg'
import dataManagement2 from '@Pimcore/assets/icons/data-management-2.inline.svg'
import historyOutlined from '@Pimcore/assets/icons/history-outlined.inline.svg'
import scheduleOutlined from '@Pimcore/assets/icons/schedule-outlined.inline.svg'
import hierarchy from '@Pimcore/assets/icons/hierarchy.inline.svg'
import viewDetails from '@Pimcore/assets/icons/view-details.inline.svg'
import tagTwoTone from '@Pimcore/assets/icons/tag-two-tone.inline.svg'
import workflow from '@Pimcore/assets/icons/workflow.inline.svg'
import unorderedListOutlined from '@Pimcore/assets/icons/unordered-list-outlined.inline.svg'
import closeCircleFilled from '@Pimcore/assets/icons/close-circle-filled.inline.svg'
import checkCircleFilled from '@Pimcore/assets/icons/check-circle-filled.inline.svg'
import infoCircleFilled from '@Pimcore/assets/icons/info-circle-filled.inline.svg'
import exclamationCircleFilled from '@Pimcore/assets/icons/exclamation-circle-filled.inline.svg'
import dotsHorizontal from '@Pimcore/assets/icons/dots-horizontal.inline.svg'
import target from '@Pimcore/assets/icons/target.inline.svg'
import infoCircleOutlined from '@Pimcore/assets/icons/info-circle-outlined.inline.svg'
import leftOutlined from '@Pimcore/assets/icons/left-outlined.inline.svg'
import rightOutlined from '@Pimcore/assets/icons/right-outlined.inline.svg'
import richEdit from '@Pimcore/assets/icons/rich-edit.inline.svg'
import download02 from '@Pimcore/assets/icons/download-02.inline.svg'
import deleteOutlined from '@Pimcore/assets/icons/delete-outlined.inline.svg'
import pin02 from '@Pimcore/assets/icons/pin-02.inline.svg'
import editOutlined from '@Pimcore/assets/icons/edit-outlined.inline.svg'
import expandAltOutlined from '@Pimcore/assets/icons/expand-alt-outlined.inline.svg'
import eyeOutlined from '@Pimcore/assets/icons/eye-outlined.inline.svg'
import shareAltOutlined from '@Pimcore/assets/icons/share-alt-outlined.inline.svg'
import translation from '@Pimcore/assets/icons/translation.inline.svg'
import volumeMax from '@Pimcore/assets/icons/volume-max.inline.svg'
import fileCode01 from '@Pimcore/assets/icons/file-code-01.inline.svg'
import fileQuestion02 from '@Pimcore/assets/icons/file-question-02.inline.svg'
import file02 from '@Pimcore/assets/icons/file-02.inline.svg'
import fileCheck02 from '@Pimcore/assets/icons/file-check-02.inline.svg'
import fileX03 from '@Pimcore/assets/icons/file-x-03.inline.svg'
import presentationChart01 from '@Pimcore/assets/icons/presentation-chart-01.inline.svg'
import videoRecorder from '@Pimcore/assets/icons/video-recorder.inline.svg'
import image01 from '@Pimcore/assets/icons/image-01.inline.svg'
import ellipsisOutlined from '@Pimcore/assets/icons/ellipsis-outlined.inline.svg'
import focalPoint from '@Pimcore/assets/icons/focal-point.inline.svg'
import MinusOutlined from '@Pimcore/assets/icons/MinusOutlined.inline.svg'
import PlusOutlined from '@Pimcore/assets/icons/PlusOutlined.inline.svg'
import lightning01 from '@Pimcore/assets/icons/lightning-01.inline.svg'
import calender from '@Pimcore/assets/icons/calender.inline.svg'
import world from '@Pimcore/assets/icons/world.inline.svg'
import user01 from '@Pimcore/assets/icons/user-01.inline.svg'

moduleSystem.registerModule({
  onInit: () => {
    const iconLibrary = container.get<IconLibrary>(serviceIds.iconLibrary)

    iconLibrary.register({
      name: 'camera',
      component: camera
    })
    iconLibrary.register({
      name: 'folder',
      component: folder
    })
    iconLibrary.register({
      name: 'widget-default',
      component: widgetDefault
    })
    iconLibrary.register({
      name: 'chevron-up',
      component: chevronUp
    })
    iconLibrary.register({
      name: 'chevron-up-small',
      component: chevronUpSmall
    })
    iconLibrary.register({
      name: 'chevron-down-small',
      component: chevronDownSmall
    })
    iconLibrary.register({
      name: 'chevron-up-wide',
      component: chevronUpWide
    })
    iconLibrary.register({
      name: 'chevron-down-wide',
      component: chevronDownWide
    })
    iconLibrary.register({
      name: 'home',
      component: home
    })
    iconLibrary.register({
      name: 'refresh',
      component: refresh
    })
    iconLibrary.register({
      name: 'icon-tools',
      component: iconTools
    })
    iconLibrary.register({
      name: 'image-05',
      component: image05
    })
    iconLibrary.register({
      name: 'edit',
      component: edit
    })
    iconLibrary.register({
      name: 'data-sheet',
      component: dataSheet
    })
    iconLibrary.register({
      name: 'data-management-2',
      component: dataManagement2
    })
    iconLibrary.register({
      name: 'history-outlined',
      component: historyOutlined
    })
    iconLibrary.register({
      name: 'schedule-outlined',
      component: scheduleOutlined
    })
    iconLibrary.register({
      name: 'hierarchy',
      component: hierarchy
    })
    iconLibrary.register({
      name: 'view-details',
      component: viewDetails
    })
    iconLibrary.register({
      name: 'tag-two-tone',
      component: tagTwoTone
    })
    iconLibrary.register({
      name: 'workflow',
      component: workflow
    })
    iconLibrary.register({
      name: 'unordered-list-outlined',
      component: unorderedListOutlined
    })
    iconLibrary.register({
      name: 'close-circle-filled',
      component: closeCircleFilled
    })
    iconLibrary.register({
      name: 'check-circle-filled',
      component: checkCircleFilled
    })
    iconLibrary.register({
      name: 'info-circle-filled',
      component: infoCircleFilled
    })
    iconLibrary.register({
      name: 'exclamation-circle-filled',
      component: exclamationCircleFilled
    })
    iconLibrary.register({
      name: 'dots-horizontal',
      component: dotsHorizontal
    })
    iconLibrary.register({
      name: 'target',
      component: target
    })
    iconLibrary.register({
      name: 'info-circle-outlined',
      component: infoCircleOutlined
    })
    iconLibrary.register({
      name: 'left-outlined',
      component: leftOutlined
    })
    iconLibrary.register({
      name: 'right-outlined',
      component: rightOutlined
    })
    iconLibrary.register({
      name: 'rich-edit',
      component: richEdit
    })
    iconLibrary.register({
      name: 'download-02',
      component: download02
    })
    iconLibrary.register({
      name: 'delete-outlined',
      component: deleteOutlined
    })
    iconLibrary.register({
      name: 'pin-02',
      component: pin02
    })
    iconLibrary.register({
      name: 'edit-outlined',
      component: editOutlined
    })
    iconLibrary.register({
      name: 'expand-alt-outlined',
      component: expandAltOutlined
    })
    iconLibrary.register({
      name: 'eye-outlined',
      component: eyeOutlined
    })
    iconLibrary.register({
      name: 'share-alt-outlined',
      component: shareAltOutlined
    })
    iconLibrary.register({
      name: 'translation',
      component: translation
    })
    iconLibrary.register({
      name: 'volume-max',
      component: volumeMax
    })
    iconLibrary.register({
      name: 'file-code-01',
      component: fileCode01
    })
    iconLibrary.register({
      name: 'file-question-02',
      component: fileQuestion02
    })
    iconLibrary.register({
      name: 'file-02',
      component: file02
    })
    iconLibrary.register({
      name: 'file-check-02',
      component: fileCheck02
    })
    iconLibrary.register({
      name: 'file-x-03',
      component: fileX03
    })
    iconLibrary.register({
      name: 'presentation-chart-01',
      component: presentationChart01
    })
    iconLibrary.register({
      name: 'video-recorder',
      component: videoRecorder
    })
    iconLibrary.register({
      name: 'image-01',
      component: image01
    })
    iconLibrary.register({
      name: 'ellipsis-outlined',
      component: ellipsisOutlined
    })
    iconLibrary.register({
      name: 'focal-point',
      component: focalPoint
    })
    iconLibrary.register({
      name: 'MinusOutlined',
      component: MinusOutlined
    })
    iconLibrary.register({
      name: 'PlusOutlined',
      component: PlusOutlined
    })
    iconLibrary.register({
      name: 'lightning-01',
      component: lightning01
    })
    iconLibrary.register({
      name: 'calender',
      component: calender
    })
    iconLibrary.register({
      name: 'world',
      component: world
    })
    iconLibrary.register({
      name: 'user-01',
      component: user01
    })
  }
})

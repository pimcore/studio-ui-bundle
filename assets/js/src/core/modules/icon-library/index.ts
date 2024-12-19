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

import accessory from '../../assets/icons/accessory.svg'
import addFind from '../../assets/icons/add-find.svg'
import addFolder from '../../assets/icons/add-folder.svg'
import addImage from '../../assets/icons/add-image.svg'
import addPackage from '../../assets/icons/add-package.svg'
import addSomething from '../../assets/icons/add-something.svg'
import addUser from '../../assets/icons/add-user.svg'
import asset from '../../assets/icons/asset.svg'
import attachment from '../../assets/icons/attachment.svg'
import audio from '../../assets/icons/audio.svg'
import autoSave from '../../assets/icons/auto-save.svg'
import batchSelection from '../../assets/icons/batch-selection.svg'
import bodyStyle from '../../assets/icons/body-style.svg'
import bookmark from '../../assets/icons/bookmark.svg'
import calculator from '../../assets/icons/calculator.svg'
import calendar from '../../assets/icons/calendar.svg'
import car from '../../assets/icons/car.svg'
import catalog from '../../assets/icons/catalog.svg'
import category from '../../assets/icons/category.svg'
import cdp from '../../assets/icons/cdp.svg'
import channels from '../../assets/icons/channels.svg'
import checkCircle from '../../assets/icons/check-circle.svg'
import checkbox from '../../assets/icons/checkbox.svg'
import chevronDown from '../../assets/icons/chevron-down.svg'
import chevronLeft from '../../assets/icons/chevron-left.svg'
import chevronRight from '../../assets/icons/chevron-right.svg'
import chevronSelectorHorizontal from '../../assets/icons/chevron-selector-horizontal.svg'
import chevronUp from '../../assets/icons/chevron-up.svg'
import childrenGrid from '../../assets/icons/children-grid.svg'
import close from '../../assets/icons/close.svg'
import cms from '../../assets/icons/cms.svg'
import collection from '../../assets/icons/collection.svg'
import columns from '../../assets/icons/columns.svg'
import content from '../../assets/icons/content.svg'
import copilot from '../../assets/icons/copilot.svg'
import copy from '../../assets/icons/copy.svg'
import crop from '../../assets/icons/crop.svg'
import customMetadata from '../../assets/icons/custom--metadata.svg'
import customerSegmentGroup from '../../assets/icons/customer-segment-group.svg'
import customerSegment from '../../assets/icons/customer-segment.svg'
import customer from '../../assets/icons/customer.svg'
import customers from '../../assets/icons/customers.svg'
import cut from '../../assets/icons/cut.svg'
import dashboard from '../../assets/icons/dashboard.svg'
import dataObjectVariant from '../../assets/icons/data-object-variant.svg'
import dataObject from '../../assets/icons/data-object.svg'
import dataQuality from '../../assets/icons/data-quality.svg'
import dependencies from '../../assets/icons/dependencies.svg'
import details from '../../assets/icons/details.svg'
import document from '../../assets/icons/document.svg'
import doubleArrowDown from '../../assets/icons/double-arrow-down.svg'
import doubleArrowLeft from '../../assets/icons/double-arrow-left.svg'
import doubleArrowRight from '../../assets/icons/double-arrow-right.svg'
import doubleArrowUp from '../../assets/icons/double-arrow-up.svg'
import downloadCloud from '../../assets/icons/download-cloud.svg'
import downloadZip from '../../assets/icons/download-zip.svg'
import download from '../../assets/icons/download.svg'
import draft from '../../assets/icons/draft.svg'
import dragOption from '../../assets/icons/drag-option.svg'
import dropTarget from '../../assets/icons/drop-target.svg'
import editPen from '../../assets/icons/edit-pen.svg'
import edit from '../../assets/icons/edit.svg'
import embededMetadata from '../../assets/icons/embeded-metadata.svg'
import event from '../../assets/icons/event.svg'
import excludedFromNav from '../../assets/icons/excluded-from-nav.svg'
import expand from '../../assets/icons/expand.svg'
import exportIcon from '../../assets/icons/export.svg'
import eyeOff from '../../assets/icons/eye-off.svg'
import eye from '../../assets/icons/eye.svg'
import factory from '../../assets/icons/factory.svg'
import favorites from '../../assets/icons/favorites.svg'
import fieldCollectionField from '../../assets/icons/field-collection-field.svg'
import fileLocked from '../../assets/icons/file-locked.svg'
import filter from '../../assets/icons/filter.svg'
import flag from '../../assets/icons/flag.svg'
import flipForward from '../../assets/icons/flip-forward.svg'
import focalPoint from '../../assets/icons/focal-point.svg'
import folder from '../../assets/icons/folder.svg'
import graph from '../../assets/icons/graph.svg'
import groupByKeys from '../../assets/icons/group-by-keys.svg'
import group from '../../assets/icons/group.svg'
import heading from '../../assets/icons/heading.svg'
import helpCircle from '../../assets/icons/help-circle.svg'
import history from '../../assets/icons/history.svg'
import homeRootFolder from '../../assets/icons/home-root-folder.svg'
import image from '../../assets/icons/image.svg'
import infoCircle from '../../assets/icons/info-circle.svg'
import inheritanceBroken from '../../assets/icons/inheritance-broken.svg'
import inheritance from '../../assets/icons/inheritance.svg'
import json from '../../assets/icons/json.svg'
import layout from '../../assets/icons/layout.svg'
import list from '../../assets/icons/list.svg'
import loading from '../../assets/icons/loading.svg'
import locationMarker from '../../assets/icons/location-marker.svg'
import lock from '../../assets/icons/lock.svg'
import locked from '../../assets/icons/locked.svg'
import logOut from '../../assets/icons/log-out.svg'
import longText from '../../assets/icons/long-text.svg'
import mailAnswer from '../../assets/icons/mail-answer.svg'
import market from '../../assets/icons/market.svg'
import marketing from '../../assets/icons/marketing.svg'
import menu from '../../assets/icons/menu.svg'
import minusSquare from '../../assets/icons/minus-square.svg'
import more from '../../assets/icons/more.svg'
import moveDown from '../../assets/icons/move-down.svg'
import moveUp from '../../assets/icons/move-up.svg'
import newColumn from '../../assets/icons/new-column.svg'
import newHotspot from '../../assets/icons/new-hotspot.svg'
import newMarker from '../../assets/icons/new-marker.svg'
import newRow from '../../assets/icons/new-row.svg'
import newSomething from '../../assets/icons/new-something.svg'
import newIcon from '../../assets/icons/new.svg'
import news from '../../assets/icons/news.svg'
import notesEvents from '../../assets/icons/notes-events.svg'
import notification from '../../assets/icons/notification.svg'
import openFolder from '../../assets/icons/open-folder.svg'
import packageIcon from '../../assets/icons/package.svg'
import paste from '../../assets/icons/paste.svg'
import pdf from '../../assets/icons/pdf.svg'
import personalUser from '../../assets/icons/personal-user.svg'
import pieChart from '../../assets/icons/pie-chart.svg'
import pimcore from '../../assets/icons/pimcore.svg'
import pin from '../../assets/icons/pin.svg'
import pined from '../../assets/icons/pined.svg'
import plusSquare from '../../assets/icons/plus-square.svg'
import presentation from '../../assets/icons/presentation.svg'
import preview from '../../assets/icons/preview.svg'
import properties from '../../assets/icons/properties.svg'
import published from '../../assets/icons/published.svg'
import refresh from '../../assets/icons/refresh.svg'
import rename from '../../assets/icons/rename.svg'
import requiredBy from '../../assets/icons/required-by.svg'
import requires from '../../assets/icons/requires.svg'
import reverse from '../../assets/icons/reverse.svg'
import run from '../../assets/icons/run.svg'
import save from '../../assets/icons/save.svg'
import schedule from '../../assets/icons/schedule.svg'
import search from '../../assets/icons/search.svg'
import segmentTagging from '../../assets/icons/segment-tagging.svg'
import seo from '../../assets/icons/seo.svg'
import settings from '../../assets/icons/settings.svg'
import share from '../../assets/icons/share.svg'
import sharedUsers from '../../assets/icons/shared-users.svg'
import shield from '../../assets/icons/shield.svg'
import splitView from '../../assets/icons/split-view.svg'
import style from '../../assets/icons/style.svg'
import tag from '../../assets/icons/tag.svg'
import target from '../../assets/icons/target.svg'
import taxClass from '../../assets/icons/tax-class.svg'
import textField from '../../assets/icons/text-field.svg'
import transfer from '../../assets/icons/transfer.svg'
import translate from '../../assets/icons/translate.svg'
import trash from '../../assets/icons/trash.svg'
import tree from '../../assets/icons/tree.svg'
import txtDocs from '../../assets/icons/txt-docs.svg'
import unknown from '../../assets/icons/unknown.svg'
import unlocked from '../../assets/icons/unlocked.svg'
import uploadCloud from '../../assets/icons/upload-cloud.svg'
import uploadZip from '../../assets/icons/upload-zip.svg'
import user from '../../assets/icons/user.svg'
import video from '../../assets/icons/video.svg'
import view from '../../assets/icons/view.svg'
import warningCircle from '../../assets/icons/warning-circle.svg'
import webhook from '../../assets/icons/webhook.svg'
import widget from '../../assets/icons/widget.svg'
import workflow from '../../assets/icons/workflow.svg'
import xCircle from '../../assets/icons/x-circle.svg'
import xlsxCsv from '../../assets/icons/xlsx-csv.svg'

moduleSystem.registerModule({
  onInit: () => {
    const iconLibrary = container.get<IconLibrary>(serviceIds.iconLibrary)
    iconLibrary.register({
      name: 'accessory',
      component: accessory
    })
    iconLibrary.register({
      name: 'add-find',
      component: addFind
    })
    iconLibrary.register({
      name: 'add-folder',
      component: addFolder
    })
    iconLibrary.register({
      name: 'add-image',
      component: addImage
    })
    iconLibrary.register({
      name: 'add-package',
      component: addPackage
    })
    iconLibrary.register({
      name: 'add-something',
      component: addSomething
    })
    iconLibrary.register({
      name: 'add-user',
      component: addUser
    })
    iconLibrary.register({
      name: 'asset',
      component: asset
    })
    iconLibrary.register({
      name: 'attachment',
      component: attachment
    })
    iconLibrary.register({
      name: 'audio',
      component: audio
    })
    iconLibrary.register({
      name: 'auto-save',
      component: autoSave
    })
    iconLibrary.register({
      name: 'batch-selection',
      component: batchSelection
    })
    iconLibrary.register({
      name: 'body-style',
      component: bodyStyle
    })
    iconLibrary.register({
      name: 'bookmark',
      component: bookmark
    })
    iconLibrary.register({
      name: 'calculator',
      component: calculator
    })
    iconLibrary.register({
      name: 'calendar',
      component: calendar
    })
    iconLibrary.register({
      name: 'car',
      component: car
    })
    iconLibrary.register({
      name: 'catalog',
      component: catalog
    })
    iconLibrary.register({
      name: 'category',
      component: category
    })
    iconLibrary.register({
      name: 'cdp',
      component: cdp
    })
    iconLibrary.register({
      name: 'channels',
      component: channels
    })
    iconLibrary.register({
      name: 'check-circle',
      component: checkCircle
    })
    iconLibrary.register({
      name: 'checkbox',
      component: checkbox
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
      name: 'children-grid',
      component: childrenGrid
    })
    iconLibrary.register({
      name: 'close',
      component: close
    })
    iconLibrary.register({
      name: 'cms',
      component: cms
    })
    iconLibrary.register({
      name: 'collection',
      component: collection
    })
    iconLibrary.register({
      name: 'columns',
      component: columns
    })
    iconLibrary.register({
      name: 'content',
      component: content
    })
    iconLibrary.register({
      name: 'copilot',
      component: copilot
    })
    iconLibrary.register({
      name: 'copy',
      component: copy
    })
    iconLibrary.register({
      name: 'crop',
      component: crop
    })
    iconLibrary.register({
      name: 'custom--metadata',
      component: customMetadata
    })
    iconLibrary.register({
      name: 'customer-segment-group',
      component: customerSegmentGroup
    })
    iconLibrary.register({
      name: 'customer-segment',
      component: customerSegment
    })
    iconLibrary.register({
      name: 'customer',
      component: customer
    })
    iconLibrary.register({
      name: 'customers',
      component: customers
    })
    iconLibrary.register({
      name: 'cut',
      component: cut
    })
    iconLibrary.register({
      name: 'dashboard',
      component: dashboard
    })
    iconLibrary.register({
      name: 'data-object-variant',
      component: dataObjectVariant
    })
    iconLibrary.register({
      name: 'data-object',
      component: dataObject
    })
    iconLibrary.register({
      name: 'data-quality',
      component: dataQuality
    })
    iconLibrary.register({
      name: 'dependencies',
      component: dependencies
    })
    iconLibrary.register({
      name: 'details',
      component: details
    })
    iconLibrary.register({
      name: 'document',
      component: document
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
      name: 'download-cloud',
      component: downloadCloud
    })
    iconLibrary.register({
      name: 'download-zip',
      component: downloadZip
    })
    iconLibrary.register({
      name: 'download',
      component: download
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
      name: 'edit-pen',
      component: editPen
    })
    iconLibrary.register({
      name: 'edit',
      component: edit
    })
    iconLibrary.register({
      name: 'embeded-metadata',
      component: embededMetadata
    })
    iconLibrary.register({
      name: 'event',
      component: event
    })
    iconLibrary.register({
      name: 'excluded-from-nav',
      component: excludedFromNav
    })
    iconLibrary.register({
      name: 'expand',
      component: expand
    })
    iconLibrary.register({
      name: 'export',
      component: exportIcon
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
      name: 'factory',
      component: factory
    })
    iconLibrary.register({
      name: 'favorites',
      component: favorites
    })
    iconLibrary.register({
      name: 'field-collection-field',
      component: fieldCollectionField
    })
    iconLibrary.register({
      name: 'file-locked',
      component: fileLocked
    })
    iconLibrary.register({
      name: 'filter',
      component: filter
    })
    iconLibrary.register({
      name: 'flag',
      component: flag
    })
    iconLibrary.register({
      name: 'flip-forward',
      component: flipForward
    })
    iconLibrary.register({
      name: 'focal-point',
      component: focalPoint
    })
    iconLibrary.register({
      name: 'folder',
      component: folder
    })
    iconLibrary.register({
      name: 'graph',
      component: graph
    })
    iconLibrary.register({
      name: 'group-by-keys',
      component: groupByKeys
    })
    iconLibrary.register({
      name: 'group',
      component: group
    })
    iconLibrary.register({
      name: 'heading',
      component: heading
    })
    iconLibrary.register({
      name: 'help-circle',
      component: helpCircle
    })
    iconLibrary.register({
      name: 'history',
      component: history
    })
    iconLibrary.register({
      name: 'home-root-folder',
      component: homeRootFolder
    })
    iconLibrary.register({
      name: 'image',
      component: image
    })
    iconLibrary.register({
      name: 'info-circle',
      component: infoCircle
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
      name: 'json',
      component: json
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
      name: 'location-marker',
      component: locationMarker
    })
    iconLibrary.register({
      name: 'lock',
      component: lock
    })
    iconLibrary.register({
      name: 'locked',
      component: locked
    })
    iconLibrary.register({
      name: 'log-out',
      component: logOut
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
      name: 'market',
      component: market
    })
    iconLibrary.register({
      name: 'marketing',
      component: marketing
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
      name: 'move-down',
      component: moveDown
    })
    iconLibrary.register({
      name: 'move-up',
      component: moveUp
    })
    iconLibrary.register({
      name: 'new-column',
      component: newColumn
    })
    iconLibrary.register({
      name: 'new-hotspot',
      component: newHotspot
    })
    iconLibrary.register({
      name: 'new-marker',
      component: newMarker
    })
    iconLibrary.register({
      name: 'new-row',
      component: newRow
    })
    iconLibrary.register({
      name: 'new-something',
      component: newSomething
    })
    iconLibrary.register({
      name: 'new',
      component: newIcon
    })
    iconLibrary.register({
      name: 'news',
      component: news
    })
    iconLibrary.register({
      name: 'notes-events',
      component: notesEvents
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
      name: 'package',
      component: packageIcon
    })
    iconLibrary.register({
      name: 'paste',
      component: paste
    })
    iconLibrary.register({
      name: 'pdf',
      component: pdf
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
      name: 'pimcore',
      component: pimcore
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
      name: 'presentation',
      component: presentation
    })
    iconLibrary.register({
      name: 'preview',
      component: preview
    })
    iconLibrary.register({
      name: 'properties',
      component: properties
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
      name: 'rename',
      component: rename
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
      name: 'run',
      component: run
    })
    iconLibrary.register({
      name: 'save',
      component: save
    })
    iconLibrary.register({
      name: 'schedule',
      component: schedule
    })
    iconLibrary.register({
      name: 'search',
      component: search
    })
    iconLibrary.register({
      name: 'segment-tagging',
      component: segmentTagging
    })
    iconLibrary.register({
      name: 'seo',
      component: seo
    })
    iconLibrary.register({
      name: 'settings',
      component: settings
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
      name: 'split-view',
      component: splitView
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
      name: 'tax-class',
      component: taxClass
    })
    iconLibrary.register({
      name: 'text-field',
      component: textField
    })
    iconLibrary.register({
      name: 'transfer',
      component: transfer
    })
    iconLibrary.register({
      name: 'translate',
      component: translate
    })
    iconLibrary.register({
      name: 'trash',
      component: trash
    })
    iconLibrary.register({
      name: 'tree',
      component: tree
    })
    iconLibrary.register({
      name: 'txt-docs',
      component: txtDocs
    })
    iconLibrary.register({
      name: 'unknown',
      component: unknown
    })
    iconLibrary.register({
      name: 'unlocked',
      component: unlocked
    })
    iconLibrary.register({
      name: 'upload-cloud',
      component: uploadCloud
    })
    iconLibrary.register({
      name: 'upload-zip',
      component: uploadZip
    })
    iconLibrary.register({
      name: 'user',
      component: user
    })
    iconLibrary.register({
      name: 'video',
      component: video
    })
    iconLibrary.register({
      name: 'view',
      component: view
    })
    iconLibrary.register({
      name: 'warning-circle',
      component: warningCircle
    })
    iconLibrary.register({
      name: 'webhook',
      component: webhook
    })
    iconLibrary.register({
      name: 'widget',
      component: widget
    })
    iconLibrary.register({
      name: 'workflow',
      component: workflow
    })
    iconLibrary.register({
      name: 'x-circle',
      component: xCircle
    })
    iconLibrary.register({
      name: 'xlsx-csv',
      component: xlsxCsv
    })
  }
})

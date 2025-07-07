/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type IconLibrary } from './services/icon-library'

import accessory from '@Pimcore/assets/icons/accessory.inline.svg?react'
import addFind from '@Pimcore/assets/icons/add-find.inline.svg?react'
import addFolder from '@Pimcore/assets/icons/add-folder.inline.svg?react'
import addImage from '@Pimcore/assets/icons/add-image.inline.svg?react'
import addPackage from '@Pimcore/assets/icons/add-package.inline.svg?react'
import addSomething from '@Pimcore/assets/icons/add-something.inline.svg?react'
import addUser from '@Pimcore/assets/icons/add-user.inline.svg?react'
import alert from '@Pimcore/assets/icons/alert.inline.svg?react'
import arrowNarrowRight from '@Pimcore/assets/icons/arrow-narrow-right.inline.svg?react'
import asset from '@Pimcore/assets/icons/asset.inline.svg?react'
import attachment from '@Pimcore/assets/icons/attachment.inline.svg?react'
import audio from '@Pimcore/assets/icons/audio.inline.svg?react'
import autoSave from '@Pimcore/assets/icons/auto-save.inline.svg?react'
import batchSelection from '@Pimcore/assets/icons/batch-selection.inline.svg?react'
import bodyStyle from '@Pimcore/assets/icons/body-style.inline.svg?react'
import bookmark from '@Pimcore/assets/icons/bookmark.inline.svg?react'
import cache from '@Pimcore/assets/icons/cache.inline.svg?react'
import calculator from '@Pimcore/assets/icons/calculator.inline.svg?react'
import calendar from '@Pimcore/assets/icons/calendar.inline.svg?react'
import car from '@Pimcore/assets/icons/car.inline.svg?react'
import catalog from '@Pimcore/assets/icons/catalog.inline.svg?react'
import category from '@Pimcore/assets/icons/category.inline.svg?react'
import cdp from '@Pimcore/assets/icons/cdp.inline.svg?react'
import channels from '@Pimcore/assets/icons/channels.inline.svg?react'
import checkCircle from '@Pimcore/assets/icons/check-circle.inline.svg?react'
import checkbox from '@Pimcore/assets/icons/checkbox.inline.svg?react'
import checkmark from '@Pimcore/assets/icons/checkmark.inline.svg?react'
import chevronDown from '@Pimcore/assets/icons/chevron-down.inline.svg?react'
import chevronLeft from '@Pimcore/assets/icons/chevron-left.inline.svg?react'
import chevronRight from '@Pimcore/assets/icons/chevron-right.inline.svg?react'
import chevronSelectorHorizontal from '@Pimcore/assets/icons/chevron-selector-horizontal.inline.svg?react'
import chevronUp from '@Pimcore/assets/icons/chevron-up.inline.svg?react'
import childrenGrid from '@Pimcore/assets/icons/children-grid.inline.svg?react'
import closeFilled from '@Pimcore/assets/icons/close-filled.inline.svg?react'
import close from '@Pimcore/assets/icons/close.inline.svg?react'
import cms from '@Pimcore/assets/icons/cms.inline.svg?react'
import collection from '@Pimcore/assets/icons/collection.inline.svg?react'
import columns from '@Pimcore/assets/icons/columns.inline.svg?react'
import contentDuplicate from '@Pimcore/assets/icons/content-duplicate.inline.svg?react'
import content from '@Pimcore/assets/icons/content.inline.svg?react'
import copilot from '@Pimcore/assets/icons/copilot.inline.svg?react'
import copy from '@Pimcore/assets/icons/copy.inline.svg?react'
import countrySelect from '@Pimcore/assets/icons/country-select.inline.svg?react'
import crop from '@Pimcore/assets/icons/crop.inline.svg?react'
import customMetadata from '@Pimcore/assets/icons/custom-metadata.inline.svg?react'
import customerSegmentGroup from '@Pimcore/assets/icons/customer-segment-group.inline.svg?react'
import customerSegment from '@Pimcore/assets/icons/customer-segment.inline.svg?react'
import customer from '@Pimcore/assets/icons/customer.inline.svg?react'
import customers from '@Pimcore/assets/icons/customers.inline.svg?react'
import cut from '@Pimcore/assets/icons/cut.inline.svg?react'
import dashboard from '@Pimcore/assets/icons/dashboard.inline.svg?react'
import dataObjectVariant from '@Pimcore/assets/icons/data-object-variant.inline.svg?react'
import dataObject from '@Pimcore/assets/icons/data-object.inline.svg?react'
import dataQuality from '@Pimcore/assets/icons/data-quality.inline.svg?react'
import dateTimeField from '@Pimcore/assets/icons/date-time-field.inline.svg?react'
import deleteColumn from '@Pimcore/assets/icons/delete-column.inline.svg?react'
import deleteRow from '@Pimcore/assets/icons/delete-row.inline.svg?react'
import dependencies from '@Pimcore/assets/icons/dependencies.inline.svg?react'
import details from '@Pimcore/assets/icons/details.inline.svg?react'
import documentTypes from '@Pimcore/assets/icons/document-types.inline.svg?react'
import document from '@Pimcore/assets/icons/document.inline.svg?react'
import doubleArrowDown from '@Pimcore/assets/icons/double-arrow-down.inline.svg?react'
import doubleArrowLeft from '@Pimcore/assets/icons/double-arrow-left.inline.svg?react'
import doubleArrowRight from '@Pimcore/assets/icons/double-arrow-right.inline.svg?react'
import doubleArrowUp from '@Pimcore/assets/icons/double-arrow-up.inline.svg?react'
import downloadCloud from '@Pimcore/assets/icons/download-cloud.inline.svg?react'
import downloadZip from '@Pimcore/assets/icons/download-zip.inline.svg?react'
import download from '@Pimcore/assets/icons/download.inline.svg?react'
import draft from '@Pimcore/assets/icons/draft.inline.svg?react'
import dragOption from '@Pimcore/assets/icons/drag-option.inline.svg?react'
import dropTarget from '@Pimcore/assets/icons/drop-target.inline.svg?react'
import editPen from '@Pimcore/assets/icons/edit-pen.inline.svg?react'
import edit from '@Pimcore/assets/icons/edit.inline.svg?react'
import embeddedMetadata from '@Pimcore/assets/icons/embedded-metadata.inline.svg?react'
import event from '@Pimcore/assets/icons/event.inline.svg?react'
import excludedFromNav from '@Pimcore/assets/icons/excluded-from-nav.inline.svg?react'
import expand from '@Pimcore/assets/icons/expand.inline.svg?react'
import exportIcon from '@Pimcore/assets/icons/export.inline.svg?react'
import eyeOff from '@Pimcore/assets/icons/eye-off.inline.svg?react'
import eye from '@Pimcore/assets/icons/eye.inline.svg?react'
import factory from '@Pimcore/assets/icons/factory.inline.svg?react'
import favorites from '@Pimcore/assets/icons/favorites.inline.svg?react'
import fieldCollectionField from '@Pimcore/assets/icons/field-collection-field.inline.svg?react'
import fileLocked from '@Pimcore/assets/icons/file-locked.inline.svg?react'
import filter from '@Pimcore/assets/icons/filter.inline.svg?react'
import flag from '@Pimcore/assets/icons/flag.inline.svg?react'
import flipForward from '@Pimcore/assets/icons/flip-forward.inline.svg?react'
import focalPoint from '@Pimcore/assets/icons/focal-point.inline.svg?react'
import folderPlus from '@Pimcore/assets/icons/folder-plus.inline.svg?react'
import folderSearch from '@Pimcore/assets/icons/folder-search.inline.svg?react'
import folder from '@Pimcore/assets/icons/folder.inline.svg?react'
import graph from '@Pimcore/assets/icons/graph.inline.svg?react'
import groupByKeys from '@Pimcore/assets/icons/group-by-keys.inline.svg?react'
import group from '@Pimcore/assets/icons/group.inline.svg?react'
import heading from '@Pimcore/assets/icons/heading.inline.svg?react'
import helpCircle from '@Pimcore/assets/icons/help-circle.inline.svg?react'
import history from '@Pimcore/assets/icons/history.inline.svg?react'
import homeRootFolder from '@Pimcore/assets/icons/home-root-folder.inline.svg?react'
import image from '@Pimcore/assets/icons/image.inline.svg?react'
import infoCircle from '@Pimcore/assets/icons/info-circle.inline.svg?react'
import info from '@Pimcore/assets/icons/info.inline.svg?react'
import inheritanceActive from '@Pimcore/assets/icons/inheritance-active.inline.svg?react'
import inheritanceBroken from '@Pimcore/assets/icons/inheritance-broken.inline.svg?react'
import json from '@Pimcore/assets/icons/json.inline.svg?react'
import key from '@Pimcore/assets/icons/key.inline.svg?react'
import keyboard from '@Pimcore/assets/icons/keyboard.inline.svg?react'
import keys from '@Pimcore/assets/icons/keys.inline.svg?react'
import languageSelect from '@Pimcore/assets/icons/language-select.inline.svg?react'
import layout from '@Pimcore/assets/icons/layout.inline.svg?react'
import list from '@Pimcore/assets/icons/list.inline.svg?react'
import loading from '@Pimcore/assets/icons/loading.inline.svg?react'
import locationMarker from '@Pimcore/assets/icons/location-marker.inline.svg?react'
import lock from '@Pimcore/assets/icons/lock.inline.svg?react'
import locked from '@Pimcore/assets/icons/locked.inline.svg?react'
import logOut from '@Pimcore/assets/icons/log-out.inline.svg?react'
import longText from '@Pimcore/assets/icons/long-text.inline.svg?react'
import mail02 from '@Pimcore/assets/icons/mail-02.inline.svg?react'
import mailAnswer from '@Pimcore/assets/icons/mail-answer.inline.svg?react'
import manyToMany from '@Pimcore/assets/icons/many-to-many.inline.svg?react'
import market from '@Pimcore/assets/icons/market.inline.svg?react'
import marketing from '@Pimcore/assets/icons/marketing.inline.svg?react'
import menu from '@Pimcore/assets/icons/menu.inline.svg?react'
import minusSquare from '@Pimcore/assets/icons/minus-square.inline.svg?react'
import minus from '@Pimcore/assets/icons/minus.inline.svg?react'
import more from '@Pimcore/assets/icons/more.inline.svg?react'
import moveDown from '@Pimcore/assets/icons/move-down.inline.svg?react'
import moveUp from '@Pimcore/assets/icons/move-up.inline.svg?react'
import multiSelect from '@Pimcore/assets/icons/multi-select.inline.svg?react'
import newCircle from '@Pimcore/assets/icons/new-circle.inline.svg?react'
import newColumn from '@Pimcore/assets/icons/new-column.inline.svg?react'
import newHotspot from '@Pimcore/assets/icons/new-hotspot.inline.svg?react'
import newMarker from '@Pimcore/assets/icons/new-marker.inline.svg?react'
import newRow from '@Pimcore/assets/icons/new-row.inline.svg?react'
import newSomething from '@Pimcore/assets/icons/new-something.inline.svg?react'
import newIcon from '@Pimcore/assets/icons/new.inline.svg?react'
import news from '@Pimcore/assets/icons/news.inline.svg?react'
import noContent from '@Pimcore/assets/icons/no-content.inline.svg?react'
import notesEvents from '@Pimcore/assets/icons/notes-events.inline.svg?react'
import notificationRead from '@Pimcore/assets/icons/notification-read.inline.svg?react'
import notificationUnread from '@Pimcore/assets/icons/notification-unread.inline.svg?react'
import numberField from '@Pimcore/assets/icons/number-field.inline.svg?react'
import openFolder from '@Pimcore/assets/icons/open-folder.inline.svg?react'
import packageIcon from '@Pimcore/assets/icons/package.inline.svg?react'
import paste from '@Pimcore/assets/icons/paste.inline.svg?react'
import pdf from '@Pimcore/assets/icons/pdf.inline.svg?react'
import personalUser from '@Pimcore/assets/icons/personal-user.inline.svg?react'
import pieChart from '@Pimcore/assets/icons/pie-chart.inline.svg?react'
import pimcore from '@Pimcore/assets/icons/pimcore.inline.svg?react'
import pin from '@Pimcore/assets/icons/pin.inline.svg?react'
import pined from '@Pimcore/assets/icons/pined.inline.svg?react'
import plusSquare from '@Pimcore/assets/icons/plus-square.inline.svg?react'
import presentation from '@Pimcore/assets/icons/presentation.inline.svg?react'
import preview from '@Pimcore/assets/icons/preview.inline.svg?react'
import properties from '@Pimcore/assets/icons/properties.inline.svg?react'
import published from '@Pimcore/assets/icons/published.inline.svg?react'
import questionmark from '@Pimcore/assets/icons/questionmark.inline.svg?react'
import refresh from '@Pimcore/assets/icons/refresh.inline.svg?react'
import removeImageThumbnail from '@Pimcore/assets/icons/remove-image-thumbnail.inline.svg?react'
import removeMarker from '@Pimcore/assets/icons/remove-marker.inline.svg?react'
import removePdfThumbnail from '@Pimcore/assets/icons/remove-pdf-thumbnail.inline.svg?react'
import removeVideoThumbnail from '@Pimcore/assets/icons/remove-video-thumbnail.inline.svg?react'
import rename from '@Pimcore/assets/icons/rename.inline.svg?react'
import requiredBy from '@Pimcore/assets/icons/required-by.inline.svg?react'
import requires from '@Pimcore/assets/icons/requires.inline.svg?react'
import reverse from '@Pimcore/assets/icons/reverse.inline.svg?react'
import run from '@Pimcore/assets/icons/run.inline.svg?react'
import save from '@Pimcore/assets/icons/save.inline.svg?react'
import schedule from '@Pimcore/assets/icons/schedule.inline.svg?react'
import search from '@Pimcore/assets/icons/search.inline.svg?react'
import segmentTagging from '@Pimcore/assets/icons/segment-tagging.inline.svg?react'
import send03 from '@Pimcore/assets/icons/send-03.inline.svg?react'
import seo from '@Pimcore/assets/icons/seo.inline.svg?react'
import settings from '@Pimcore/assets/icons/settings.inline.svg?react'
import share from '@Pimcore/assets/icons/share.inline.svg?react'
import sharedUsers from '@Pimcore/assets/icons/shared-users.inline.svg?react'
import shield from '@Pimcore/assets/icons/shield.inline.svg?react'
import showDetails from '@Pimcore/assets/icons/show-details.inline.svg?react'
import spinner from '@Pimcore/assets/icons/spinner.inline.svg?react'
import splitView from '@Pimcore/assets/icons/split-view.inline.svg?react'
import style from '@Pimcore/assets/icons/style.inline.svg?react'
import tagConfiguration from '@Pimcore/assets/icons/tag-configuration.inline.svg?react'
import tag from '@Pimcore/assets/icons/tag.inline.svg?react'
import target from '@Pimcore/assets/icons/target.inline.svg?react'
import taxClass from '@Pimcore/assets/icons/tax-class.inline.svg?react'
import textField from '@Pimcore/assets/icons/text-field.inline.svg?react'
import transfer from '@Pimcore/assets/icons/transfer.inline.svg?react'
import translate from '@Pimcore/assets/icons/translate.inline.svg?react'
import trash from '@Pimcore/assets/icons/trash.inline.svg?react'
import tree from '@Pimcore/assets/icons/tree.inline.svg?react'
import txtDocs from '@Pimcore/assets/icons/txt-docs.inline.svg?react'
import unknown from '@Pimcore/assets/icons/unknown.inline.svg?react'
import unlocked from '@Pimcore/assets/icons/unlocked.inline.svg?react'
import uploadCloud from '@Pimcore/assets/icons/upload-cloud.inline.svg?react'
import uploadZip from '@Pimcore/assets/icons/upload-zip.inline.svg?react'
import userSelect from '@Pimcore/assets/icons/user-select.inline.svg?react'
import user from '@Pimcore/assets/icons/user.inline.svg?react'
import usersX from '@Pimcore/assets/icons/users-x.inline.svg?react'
import vector from '@Pimcore/assets/icons/vector.inline.svg?react'
import video from '@Pimcore/assets/icons/video.inline.svg?react'
import view from '@Pimcore/assets/icons/view.inline.svg?react'
import warningCircle from '@Pimcore/assets/icons/warning-circle.inline.svg?react'
import webSettings from '@Pimcore/assets/icons/web-settings.inline.svg?react'
import webhook from '@Pimcore/assets/icons/webhook.inline.svg?react'
import widget from '@Pimcore/assets/icons/widget.inline.svg?react'
import workflow from '@Pimcore/assets/icons/workflow.inline.svg?react'
import wysiwygField from '@Pimcore/assets/icons/wysiwyg-field.inline.svg?react'
import xCircle from '@Pimcore/assets/icons/x-circle.inline.svg?react'
import xlsxCsv from '@Pimcore/assets/icons/xlsx-csv.inline.svg?react'

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
      name: 'alert',
      component: alert
    })
    iconLibrary.register({
      name: 'arrow-narrow-right',
      component: arrowNarrowRight
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
      name: 'cache',
      component: cache
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
      name: 'checkmark',
      component: checkmark
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
      name: 'close-filled',
      component: closeFilled
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
      name: 'content-duplicate',
      component: contentDuplicate
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
      name: 'country-select',
      component: countrySelect
    })
    iconLibrary.register({
      name: 'crop',
      component: crop
    })
    iconLibrary.register({
      name: 'custom-metadata',
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
      name: 'date-time-field',
      component: dateTimeField
    })
    iconLibrary.register({
      name: 'delete-column',
      component: deleteColumn
    })
    iconLibrary.register({
      name: 'delete-row',
      component: deleteRow
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
      name: 'document-types',
      component: documentTypes
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
      name: 'embedded-metadata',
      component: embeddedMetadata
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
      name: 'folder-plus',
      component: folderPlus
    })
    iconLibrary.register({
      name: 'folder-search',
      component: folderSearch
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
      name: 'info',
      component: info
    })
    iconLibrary.register({
      name: 'inheritance-active',
      component: inheritanceActive
    })
    iconLibrary.register({
      name: 'inheritance-broken',
      component: inheritanceBroken
    })
    iconLibrary.register({
      name: 'json',
      component: json
    })
    iconLibrary.register({
      name: 'key',
      component: key
    })
    iconLibrary.register({
      name: 'keyboard',
      component: keyboard
    })
    iconLibrary.register({
      name: 'keys',
      component: keys
    })
    iconLibrary.register({
      name: 'language-select',
      component: languageSelect
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
      name: 'mail-02',
      component: mail02
    })
    iconLibrary.register({
      name: 'mail-answer',
      component: mailAnswer
    })
    iconLibrary.register({
      name: 'many-to-many',
      component: manyToMany
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
      name: 'minus',
      component: minus
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
      name: 'multi-select',
      component: multiSelect
    })
    iconLibrary.register({
      name: 'new-circle',
      component: newCircle
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
      name: 'no-content',
      component: noContent
    })
    iconLibrary.register({
      name: 'notes-events',
      component: notesEvents
    })
    iconLibrary.register({
      name: 'notification-read',
      component: notificationRead
    })
    iconLibrary.register({
      name: 'notification-unread',
      component: notificationUnread
    })
    iconLibrary.register({
      name: 'number-field',
      component: numberField
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
      name: 'questionmark',
      component: questionmark
    })
    iconLibrary.register({
      name: 'refresh',
      component: refresh
    })
    iconLibrary.register({
      name: 'remove-image-thumbnail',
      component: removeImageThumbnail
    })
    iconLibrary.register({
      name: 'remove-marker',
      component: removeMarker
    })
    iconLibrary.register({
      name: 'remove-pdf-thumbnail',
      component: removePdfThumbnail
    })
    iconLibrary.register({
      name: 'remove-video-thumbnail',
      component: removeVideoThumbnail
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
      name: 'send-03',
      component: send03
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
      name: 'show-details',
      component: showDetails
    })
    iconLibrary.register({
      name: 'spinner',
      component: spinner
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
      name: 'tag-configuration',
      component: tagConfiguration
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
      name: 'user-select',
      component: userSelect
    })
    iconLibrary.register({
      name: 'user',
      component: user
    })
    iconLibrary.register({
      name: 'users-x',
      component: usersX
    })
    iconLibrary.register({
      name: 'vector',
      component: vector
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
      name: 'web-settings',
      component: webSettings
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
      name: 'wysiwyg-field',
      component: wysiwygField
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

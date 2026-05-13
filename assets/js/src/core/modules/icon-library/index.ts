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

import aToZOrder from '@Pimcore/assets/icons/a-to-z-order.inline.svg?react'
import accessory from '@Pimcore/assets/icons/accessory.inline.svg?react'
import accordion from '@Pimcore/assets/icons/accordion.inline.svg?react'
import activities from '@Pimcore/assets/icons/activities.inline.svg?react'
import addFind from '@Pimcore/assets/icons/add-find.inline.svg?react'
import addFolder from '@Pimcore/assets/icons/add-folder.inline.svg?react'
import addImage from '@Pimcore/assets/icons/add-image.inline.svg?react'
import addPackage from '@Pimcore/assets/icons/add-package.inline.svg?react'
import addSomething from '@Pimcore/assets/icons/add-something.inline.svg?react'
import addUser from '@Pimcore/assets/icons/add-user.inline.svg?react'
import addativPricingRules from '@Pimcore/assets/icons/addativ-pricing-rules.inline.svg?react'
import advancedManyToManyObjectRelation from '@Pimcore/assets/icons/advanced-many-to-many-object-relation.inline.svg?react'
import advancedManyToManyRelation from '@Pimcore/assets/icons/advanced-many-to-many-relation.inline.svg?react'
import alertOutline from '@Pimcore/assets/icons/alert-outline.inline.svg?react'
import alert from '@Pimcore/assets/icons/alert.inline.svg?react'
import alternativeElementTree from '@Pimcore/assets/icons/alternative-element-tree.inline.svg?react'
import appearanceBranding from '@Pimcore/assets/icons/appearance-branding.inline.svg?react'
import applicationLogger from '@Pimcore/assets/icons/application-logger.inline.svg?react'
import areaBrick from '@Pimcore/assets/icons/area-brick.inline.svg?react'
import arrowNarrowRight from '@Pimcore/assets/icons/arrow-narrow-right.inline.svg?react'
import arrowSquareRight from '@Pimcore/assets/icons/arrow-square-right.inline.svg?react'
import assetMetadataClassDefinition from '@Pimcore/assets/icons/asset-metadata-class-definition.inline.svg?react'
import asset from '@Pimcore/assets/icons/asset.inline.svg?react'
import attachment from '@Pimcore/assets/icons/attachment.inline.svg?react'
import audio from '@Pimcore/assets/icons/audio.inline.svg?react'
import autoSave from '@Pimcore/assets/icons/auto-save.inline.svg?react'
import autofill from '@Pimcore/assets/icons/autofill.inline.svg?react'
import automationAction from '@Pimcore/assets/icons/automation-action.inline.svg?react'
import automationIntegration from '@Pimcore/assets/icons/automation-integration.inline.svg?react'
import batchSelection from '@Pimcore/assets/icons/batch-selection.inline.svg?react'
import blank from '@Pimcore/assets/icons/blank.inline.svg?react'
import block from '@Pimcore/assets/icons/block.inline.svg?react'
import bodyStyle from '@Pimcore/assets/icons/body-style.inline.svg?react'
import bookOpen01 from '@Pimcore/assets/icons/book-open-01.inline.svg?react'
import bookmarkListAssetFolder from '@Pimcore/assets/icons/bookmark-list-asset-folder.inline.svg?react'
import bookmarkListDocumentFolder from '@Pimcore/assets/icons/bookmark-list-document-folder.inline.svg?react'
import bookmarkListObjectFolder from '@Pimcore/assets/icons/bookmark-list-object-folder.inline.svg?react'
import bookmark from '@Pimcore/assets/icons/bookmark.inline.svg?react'
import booleanSelect from '@Pimcore/assets/icons/boolean-select.inline.svg?react'
import cache from '@Pimcore/assets/icons/cache.inline.svg?react'
import calculator from '@Pimcore/assets/icons/calculator.inline.svg?react'
import calendar from '@Pimcore/assets/icons/calendar.inline.svg?react'
import cancel from '@Pimcore/assets/icons/cancel.inline.svg?react'
import car from '@Pimcore/assets/icons/car.inline.svg?react'
import catalog from '@Pimcore/assets/icons/catalog.inline.svg?react'
import category from '@Pimcore/assets/icons/category.inline.svg?react'
import cdp from '@Pimcore/assets/icons/cdp.inline.svg?react'
import channels from '@Pimcore/assets/icons/channels.inline.svg?react'
import chartScatter from '@Pimcore/assets/icons/chart-scatter.inline.svg?react'
import checkCircle from '@Pimcore/assets/icons/check-circle.inline.svg?react'
import checkbox from '@Pimcore/assets/icons/checkbox.inline.svg?react'
import checkmark from '@Pimcore/assets/icons/checkmark.inline.svg?react'
import chevronDown from '@Pimcore/assets/icons/chevron-down.inline.svg?react'
import chevronLeft from '@Pimcore/assets/icons/chevron-left.inline.svg?react'
import chevronRight from '@Pimcore/assets/icons/chevron-right.inline.svg?react'
import chevronSelectorHorizontal from '@Pimcore/assets/icons/chevron-selector-horizontal.inline.svg?react'
import chevronUp from '@Pimcore/assets/icons/chevron-up.inline.svg?react'
import childrenGrid from '@Pimcore/assets/icons/children-grid.inline.svg?react'
import classIcon from '@Pimcore/assets/icons/class.inline.svg?react'
import classificationStore from '@Pimcore/assets/icons/classification-store.inline.svg?react'
import closeFilled from '@Pimcore/assets/icons/close-filled.inline.svg?react'
import close from '@Pimcore/assets/icons/close.inline.svg?react'
import cms from '@Pimcore/assets/icons/cms.inline.svg?react'
import code from '@Pimcore/assets/icons/code.inline.svg?react'
import collapse from '@Pimcore/assets/icons/collapse.inline.svg?react'
import collection from '@Pimcore/assets/icons/collection.inline.svg?react'
import color from '@Pimcore/assets/icons/color.inline.svg?react'
import columns from '@Pimcore/assets/icons/columns.inline.svg?react'
import comboboxField from '@Pimcore/assets/icons/combobox-field.inline.svg?react'
import compare from '@Pimcore/assets/icons/compare.inline.svg?react'
import contentDuplicate from '@Pimcore/assets/icons/content-duplicate.inline.svg?react'
import contentSettings from '@Pimcore/assets/icons/content-settings.inline.svg?react'
import content from '@Pimcore/assets/icons/content.inline.svg?react'
import contrast01 from '@Pimcore/assets/icons/contrast-01.inline.svg?react'
import convert from '@Pimcore/assets/icons/convert.inline.svg?react'
import copilotJobRuns from '@Pimcore/assets/icons/copilot-job-runs.inline.svg?react'
import copilot from '@Pimcore/assets/icons/copilot.inline.svg?react'
import copy03 from '@Pimcore/assets/icons/copy-03.inline.svg?react'
import copy from '@Pimcore/assets/icons/copy.inline.svg?react'
import cornerUpLeft from '@Pimcore/assets/icons/corner-up-left.inline.svg?react'
import counter from '@Pimcore/assets/icons/counter.inline.svg?react'
import countriesMultiple from '@Pimcore/assets/icons/countries-multiple.inline.svg?react'
import countrySelect from '@Pimcore/assets/icons/country-select.inline.svg?react'
import crm from '@Pimcore/assets/icons/crm.inline.svg?react'
import crop from '@Pimcore/assets/icons/crop.inline.svg?react'
import customLayout from '@Pimcore/assets/icons/custom-layout.inline.svg?react'
import customMetadata from '@Pimcore/assets/icons/custom-metadata.inline.svg?react'
import customerAutomation from '@Pimcore/assets/icons/customer-automation.inline.svg?react'
import customerDuplicate from '@Pimcore/assets/icons/customer-duplicate.inline.svg?react'
import customerManagement from '@Pimcore/assets/icons/customer-management.inline.svg?react'
import customerSegmentGroup from '@Pimcore/assets/icons/customer-segment-group.inline.svg?react'
import customerSegment from '@Pimcore/assets/icons/customer-segment.inline.svg?react'
import customer from '@Pimcore/assets/icons/customer.inline.svg?react'
import customers from '@Pimcore/assets/icons/customers.inline.svg?react'
import cut from '@Pimcore/assets/icons/cut.inline.svg?react'
import dashboard from '@Pimcore/assets/icons/dashboard.inline.svg?react'
import dataObjectVariant from '@Pimcore/assets/icons/data-object-variant.inline.svg?react'
import dataObject from '@Pimcore/assets/icons/data-object.inline.svg?react'
import dataObjectsImporter from '@Pimcore/assets/icons/data-objects-importer.inline.svg?react'
import dataQuality from '@Pimcore/assets/icons/data-quality.inline.svg?react'
import datahub from '@Pimcore/assets/icons/datahub.inline.svg?react'
import dateFormatter from '@Pimcore/assets/icons/date-formatter.inline.svg?react'
import dateRange from '@Pimcore/assets/icons/date-range.inline.svg?react'
import dateTimeField from '@Pimcore/assets/icons/date-time-field.inline.svg?react'
import date from '@Pimcore/assets/icons/date.inline.svg?react'
import deleteColumn from '@Pimcore/assets/icons/delete-column.inline.svg?react'
import deleteRow from '@Pimcore/assets/icons/delete-row.inline.svg?react'
import dependencies from '@Pimcore/assets/icons/dependencies.inline.svg?react'
import details from '@Pimcore/assets/icons/details.inline.svg?react'
import documentConfigurations from '@Pimcore/assets/icons/document-configurations.inline.svg?react'
import documentLink from '@Pimcore/assets/icons/document-link.inline.svg?react'
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
import dynamicPermission from '@Pimcore/assets/icons/dynamic-permission.inline.svg?react'
import editPen from '@Pimcore/assets/icons/edit-pen.inline.svg?react'
import edit from '@Pimcore/assets/icons/edit.inline.svg?react'
import email from '@Pimcore/assets/icons/email.inline.svg?react'
import embeddedMetadata from '@Pimcore/assets/icons/embedded-metadata.inline.svg?react'
import encrypted from '@Pimcore/assets/icons/encrypted.inline.svg?react'
import event from '@Pimcore/assets/icons/event.inline.svg?react'
import excludedFromNav from '@Pimcore/assets/icons/excluded-from-nav.inline.svg?react'
import expand01 from '@Pimcore/assets/icons/expand-01.inline.svg?react'
import expand from '@Pimcore/assets/icons/expand.inline.svg?react'
import experienceCommerce from '@Pimcore/assets/icons/experience-commerce.inline.svg?react'
import exportIcon from '@Pimcore/assets/icons/export.inline.svg?react'
import eyeOff from '@Pimcore/assets/icons/eye-off.inline.svg?react'
import eye from '@Pimcore/assets/icons/eye.inline.svg?react'
import factory from '@Pimcore/assets/icons/factory.inline.svg?react'
import favorites from '@Pimcore/assets/icons/favorites.inline.svg?react'
import fieldCollectionField from '@Pimcore/assets/icons/field-collection-field.inline.svg?react'
import fieldContainer from '@Pimcore/assets/icons/field-container.inline.svg?react'
import fieldset from '@Pimcore/assets/icons/fieldset.inline.svg?react'
import fileCheck03 from '@Pimcore/assets/icons/file-check-03.inline.svg?react'
import fileExport from '@Pimcore/assets/icons/file-export.inline.svg?react'
import fileLocked from '@Pimcore/assets/icons/file-locked.inline.svg?react'
import filter from '@Pimcore/assets/icons/filter.inline.svg?react'
import flag from '@Pimcore/assets/icons/flag.inline.svg?react'
import flipForward from '@Pimcore/assets/icons/flip-forward.inline.svg?react'
import focalPoint from '@Pimcore/assets/icons/focal-point.inline.svg?react'
import folderPlus from '@Pimcore/assets/icons/folder-plus.inline.svg?react'
import folderSearch from '@Pimcore/assets/icons/folder-search.inline.svg?react'
import folder from '@Pimcore/assets/icons/folder.inline.svg?react'
import formatters from '@Pimcore/assets/icons/formatters.inline.svg?react'
import gdprExtractor from '@Pimcore/assets/icons/gdpr-extractor.inline.svg?react'
import gender from '@Pimcore/assets/icons/gender.inline.svg?react'
import geographicalBounds from '@Pimcore/assets/icons/geographical-bounds.inline.svg?react'
import geographicalPolygon from '@Pimcore/assets/icons/geographical-polygon.inline.svg?react'
import geographicalPolyline from '@Pimcore/assets/icons/geographical-polyline.inline.svg?react'
import graph from '@Pimcore/assets/icons/graph.inline.svg?react'
import graphql from '@Pimcore/assets/icons/graphql.inline.svg?react'
import groupByKeys from '@Pimcore/assets/icons/group-by-keys.inline.svg?react'
import group from '@Pimcore/assets/icons/group.inline.svg?react'
import hardlink from '@Pimcore/assets/icons/hardlink.inline.svg?react'
import heading from '@Pimcore/assets/icons/heading.inline.svg?react'
import headlessBrick from '@Pimcore/assets/icons/headless-brick.inline.svg?react'
import headlessDocument from '@Pimcore/assets/icons/headless-document.inline.svg?react'
import headlessTemplate from '@Pimcore/assets/icons/headless-template.inline.svg?react'
import helpCircle from '@Pimcore/assets/icons/help-circle.inline.svg?react'
import history from '@Pimcore/assets/icons/history.inline.svg?react'
import homeRootFolder from '@Pimcore/assets/icons/home-root-folder.inline.svg?react'
import imageAdvanced from '@Pimcore/assets/icons/image-advanced.inline.svg?react'
import imageExternal from '@Pimcore/assets/icons/image-external.inline.svg?react'
import imageGallery from '@Pimcore/assets/icons/image-gallery.inline.svg?react'
import imageThumbnailClear from '@Pimcore/assets/icons/image-thumbnail-clear.inline.svg?react'
import imageThumbnail from '@Pimcore/assets/icons/image-thumbnail.inline.svg?react'
import image from '@Pimcore/assets/icons/image.inline.svg?react'
import importCsv from '@Pimcore/assets/icons/import-csv.inline.svg?react'
import importIcon from '@Pimcore/assets/icons/import.inline.svg?react'
import indexField from '@Pimcore/assets/icons/index-field.inline.svg?react'
import infoCircle from '@Pimcore/assets/icons/info-circle.inline.svg?react'
import info from '@Pimcore/assets/icons/info.inline.svg?react'
import inheritanceActive from '@Pimcore/assets/icons/inheritance-active.inline.svg?react'
import inheritanceBroken from '@Pimcore/assets/icons/inheritance-broken.inline.svg?react'
import inlineHelp from '@Pimcore/assets/icons/inline-help.inline.svg?react'
import inputQuantityValue from '@Pimcore/assets/icons/input-quantity-value.inline.svg?react'
import interactionAction from '@Pimcore/assets/icons/interaction-action.inline.svg?react'
import json from '@Pimcore/assets/icons/json.inline.svg?react'
import key from '@Pimcore/assets/icons/key.inline.svg?react'
import keyboard from '@Pimcore/assets/icons/keyboard.inline.svg?react'
import keys from '@Pimcore/assets/icons/keys.inline.svg?react'
import languageOverview from '@Pimcore/assets/icons/language-overview.inline.svg?react'
import languageSelect from '@Pimcore/assets/icons/language-select.inline.svg?react'
import lastRulePricingRules from '@Pimcore/assets/icons/last-rule-pricing-rules.inline.svg?react'
import layoutGrid02 from '@Pimcore/assets/icons/layout-grid-02.inline.svg?react'
import layout from '@Pimcore/assets/icons/layout.inline.svg?react'
import linkDocument from '@Pimcore/assets/icons/link-document.inline.svg?react'
import list from '@Pimcore/assets/icons/list.inline.svg?react'
import loading from '@Pimcore/assets/icons/loading.inline.svg?react'
import localeCollector from '@Pimcore/assets/icons/locale-collector.inline.svg?react'
import localeSwitcher from '@Pimcore/assets/icons/locale-switcher.inline.svg?react'
import locationMarker from '@Pimcore/assets/icons/location-marker.inline.svg?react'
import lockCircle from '@Pimcore/assets/icons/lock-circle.inline.svg?react'
import lock from '@Pimcore/assets/icons/lock.inline.svg?react'
import locked from '@Pimcore/assets/icons/locked.inline.svg?react'
import logOut from '@Pimcore/assets/icons/log-out.inline.svg?react'
import longText from '@Pimcore/assets/icons/long-text.inline.svg?react'
import mail02 from '@Pimcore/assets/icons/mail-02.inline.svg?react'
import mailAnswer from '@Pimcore/assets/icons/mail-answer.inline.svg?react'
import manualOrder from '@Pimcore/assets/icons/manual-order.inline.svg?react'
import manyToManyObjectRelation from '@Pimcore/assets/icons/many-to-many-object-relation.inline.svg?react'
import manyToManyRelation from '@Pimcore/assets/icons/many-to-many-relation.inline.svg?react'
import manyToMany from '@Pimcore/assets/icons/many-to-many.inline.svg?react'
import manyToOneRelation from '@Pimcore/assets/icons/many-to-one-relation.inline.svg?react'
import market from '@Pimcore/assets/icons/market.inline.svg?react'
import marketing from '@Pimcore/assets/icons/marketing.inline.svg?react'
import media from '@Pimcore/assets/icons/media.inline.svg?react'
import menuShortcut from '@Pimcore/assets/icons/menu-shortcut.inline.svg?react'
import menu from '@Pimcore/assets/icons/menu.inline.svg?react'
import minusSquare from '@Pimcore/assets/icons/minus-square.inline.svg?react'
import minus from '@Pimcore/assets/icons/minus.inline.svg?react'
import monitor from '@Pimcore/assets/icons/monitor.inline.svg?react'
import more from '@Pimcore/assets/icons/more.inline.svg?react'
import moveDown from '@Pimcore/assets/icons/move-down.inline.svg?react'
import moveUp from '@Pimcore/assets/icons/move-up.inline.svg?react'
import multiSelect from '@Pimcore/assets/icons/multi-select.inline.svg?react'
import multipleField from '@Pimcore/assets/icons/multiple-field.inline.svg?react'
import name from '@Pimcore/assets/icons/name.inline.svg?react'
import navigation from '@Pimcore/assets/icons/navigation.inline.svg?react'
import newCircle from '@Pimcore/assets/icons/new-circle.inline.svg?react'
import newColumn from '@Pimcore/assets/icons/new-column.inline.svg?react'
import newDataComponent from '@Pimcore/assets/icons/new-data-component.inline.svg?react'
import newDocument from '@Pimcore/assets/icons/new-document.inline.svg?react'
import newHotspot from '@Pimcore/assets/icons/new-hotspot.inline.svg?react'
import newLayout from '@Pimcore/assets/icons/new-layout.inline.svg?react'
import newMarker from '@Pimcore/assets/icons/new-marker.inline.svg?react'
import newRow from '@Pimcore/assets/icons/new-row.inline.svg?react'
import newSomething from '@Pimcore/assets/icons/new-something.inline.svg?react'
import newIcon from '@Pimcore/assets/icons/new.inline.svg?react'
import news from '@Pimcore/assets/icons/news.inline.svg?react'
import newsletterActive from '@Pimcore/assets/icons/newsletter-active.inline.svg?react'
import newsletterConfirmed from '@Pimcore/assets/icons/newsletter-confirmed.inline.svg?react'
import noContent from '@Pimcore/assets/icons/no-content.inline.svg?react'
import notVisibleElement from '@Pimcore/assets/icons/not-visible-element.inline.svg?react'
import notesEvents from '@Pimcore/assets/icons/notes-events.inline.svg?react'
import notificationRead from '@Pimcore/assets/icons/notification-read.inline.svg?react'
import notificationUnread from '@Pimcore/assets/icons/notification-unread.inline.svg?react'
import numberField from '@Pimcore/assets/icons/number-field.inline.svg?react'
import numberRange from '@Pimcore/assets/icons/number-range.inline.svg?react'
import numberType from '@Pimcore/assets/icons/number-type.inline.svg?react'
import objectBricks from '@Pimcore/assets/icons/object-bricks.inline.svg?react'
import openFolder from '@Pimcore/assets/icons/open-folder.inline.svg?react'
import openidConnect from '@Pimcore/assets/icons/openid-connect.inline.svg?react'
import operatorConcatenator from '@Pimcore/assets/icons/operator-concatenator.inline.svg?react'
import order from '@Pimcore/assets/icons/order.inline.svg?react'
import otherOperators from '@Pimcore/assets/icons/other-operators.inline.svg?react'
import other from '@Pimcore/assets/icons/other.inline.svg?react'
import packageIcon from '@Pimcore/assets/icons/package.inline.svg?react'
import pageStatic from '@Pimcore/assets/icons/page-static.inline.svg?react'
import panel from '@Pimcore/assets/icons/panel.inline.svg?react'
import password from '@Pimcore/assets/icons/password.inline.svg?react'
import paste from '@Pimcore/assets/icons/paste.inline.svg?react'
import pdf from '@Pimcore/assets/icons/pdf.inline.svg?react'
import permissionManyToOne from '@Pimcore/assets/icons/permission-many-to-one.inline.svg?react'
import permissionObject from '@Pimcore/assets/icons/permission-object.inline.svg?react'
import permissionResource from '@Pimcore/assets/icons/permission-resource.inline.svg?react'
import personalUser from '@Pimcore/assets/icons/personal-user.inline.svg?react'
import phoneHorizontal from '@Pimcore/assets/icons/phone-horizontal.inline.svg?react'
import phone from '@Pimcore/assets/icons/phone.inline.svg?react'
import pieChart from '@Pimcore/assets/icons/pie-chart.inline.svg?react'
import pimcore from '@Pimcore/assets/icons/pimcore.inline.svg?react'
import pin from '@Pimcore/assets/icons/pin.inline.svg?react'
import pined from '@Pimcore/assets/icons/pined.inline.svg?react'
import plusCircle from '@Pimcore/assets/icons/plus-circle.inline.svg?react'
import plusSquare from '@Pimcore/assets/icons/plus-square.inline.svg?react'
import portalEngineCollections from '@Pimcore/assets/icons/portal-engine-collections.inline.svg?react'
import portalEngineIndex from '@Pimcore/assets/icons/portal-engine-index.inline.svg?react'
import portalEngineWizard from '@Pimcore/assets/icons/portal-engine-wizard.inline.svg?react'
import presentation from '@Pimcore/assets/icons/presentation.inline.svg?react'
import preview from '@Pimcore/assets/icons/preview.inline.svg?react'
import pricingRules from '@Pimcore/assets/icons/pricing-rules.inline.svg?react'
import printSettings from '@Pimcore/assets/icons/print-settings.inline.svg?react'
import printpage from '@Pimcore/assets/icons/printpage.inline.svg?react'
import productsup from '@Pimcore/assets/icons/productsup.inline.svg?react'
import properties from '@Pimcore/assets/icons/properties.inline.svg?react'
import published from '@Pimcore/assets/icons/published.inline.svg?react'
import quantityValueRange from '@Pimcore/assets/icons/quantity-value-range.inline.svg?react'
import quantityValue from '@Pimcore/assets/icons/quantity-value.inline.svg?react'
import questionmark from '@Pimcore/assets/icons/questionmark.inline.svg?react'
import quickAccess from '@Pimcore/assets/icons/quick-access.inline.svg?react'
import redirect from '@Pimcore/assets/icons/redirect.inline.svg?react'
import refresh from '@Pimcore/assets/icons/refresh.inline.svg?react'
import region from '@Pimcore/assets/icons/region.inline.svg?react'
import relation from '@Pimcore/assets/icons/relation.inline.svg?react'
import removeImageThumbnail from '@Pimcore/assets/icons/remove-image-thumbnail.inline.svg?react'
import removeMarker from '@Pimcore/assets/icons/remove-marker.inline.svg?react'
import removePdfThumbnail from '@Pimcore/assets/icons/remove-pdf-thumbnail.inline.svg?react'
import removeVideoThumbnail from '@Pimcore/assets/icons/remove-video-thumbnail.inline.svg?react'
import rename from '@Pimcore/assets/icons/rename.inline.svg?react'
import reporting from '@Pimcore/assets/icons/reporting.inline.svg?react'
import requiredBy from '@Pimcore/assets/icons/required-by.inline.svg?react'
import requires from '@Pimcore/assets/icons/requires.inline.svg?react'
import restore from '@Pimcore/assets/icons/restore.inline.svg?react'
import reverseObjectRelation from '@Pimcore/assets/icons/reverse-object-relation.inline.svg?react'
import reverse from '@Pimcore/assets/icons/reverse.inline.svg?react'
import robot from '@Pimcore/assets/icons/robot.inline.svg?react'
import run from '@Pimcore/assets/icons/run.inline.svg?react'
import save from '@Pimcore/assets/icons/save.inline.svg?react'
import schedule from '@Pimcore/assets/icons/schedule.inline.svg?react'
import search from '@Pimcore/assets/icons/search.inline.svg?react'
import segmentTagging from '@Pimcore/assets/icons/segment-tagging.inline.svg?react'
import selectType from '@Pimcore/assets/icons/select-type.inline.svg?react'
import send03 from '@Pimcore/assets/icons/send-03.inline.svg?react'
import seo from '@Pimcore/assets/icons/seo.inline.svg?react'
import settingsBrightness from '@Pimcore/assets/icons/settings-brightness.inline.svg?react'
import settings from '@Pimcore/assets/icons/settings.inline.svg?react'
import shareWithUsers from '@Pimcore/assets/icons/share-with-users.inline.svg?react'
import share from '@Pimcore/assets/icons/share.inline.svg?react'
import sharedUsers from '@Pimcore/assets/icons/shared-users.inline.svg?react'
import shieldPlus from '@Pimcore/assets/icons/shield-plus.inline.svg?react'
import shield from '@Pimcore/assets/icons/shield.inline.svg?react'
import showDetails from '@Pimcore/assets/icons/show-details.inline.svg?react'
import simpleRestService from '@Pimcore/assets/icons/simple-rest-service.inline.svg?react'
import slider from '@Pimcore/assets/icons/slider.inline.svg?react'
import snippet from '@Pimcore/assets/icons/snippet.inline.svg?react'
import spinner from '@Pimcore/assets/icons/spinner.inline.svg?react'
import splitView from '@Pimcore/assets/icons/split-view.inline.svg?react'
import structuredTable from '@Pimcore/assets/icons/structured-table.inline.svg?react'
import style from '@Pimcore/assets/icons/style.inline.svg?react'
import subscriptionCommunity from '@Pimcore/assets/icons/subscription-community.inline.svg?react'
import subscriptionEnterprise from '@Pimcore/assets/icons/subscription-enterprise.inline.svg?react'
import substring from '@Pimcore/assets/icons/substring.inline.svg?react'
import systemColumns from '@Pimcore/assets/icons/system-columns.inline.svg?react'
import systemSettings from '@Pimcore/assets/icons/system-settings.inline.svg?react'
import tabPanel from '@Pimcore/assets/icons/tab-panel.inline.svg?react'
import table from '@Pimcore/assets/icons/table.inline.svg?react'
import tablet from '@Pimcore/assets/icons/tablet.inline.svg?react'
import tagConfiguration from '@Pimcore/assets/icons/tag-configuration.inline.svg?react'
import tag from '@Pimcore/assets/icons/tag.inline.svg?react'
import targetGroup from '@Pimcore/assets/icons/target-group.inline.svg?react'
import target from '@Pimcore/assets/icons/target.inline.svg?react'
import taxClass from '@Pimcore/assets/icons/tax-class.inline.svg?react'
import test from '@Pimcore/assets/icons/test.inline.svg?react'
import textField from '@Pimcore/assets/icons/text-field.inline.svg?react'
import textInput from '@Pimcore/assets/icons/text-input.inline.svg?react'
import thumbnailHtml from '@Pimcore/assets/icons/thumbnail-html.inline.svg?react'
import time from '@Pimcore/assets/icons/time.inline.svg?react'
import transfer from '@Pimcore/assets/icons/transfer.inline.svg?react'
import transformers from '@Pimcore/assets/icons/transformers.inline.svg?react'
import translate from '@Pimcore/assets/icons/translate.inline.svg?react'
import translations from '@Pimcore/assets/icons/translations.inline.svg?react'
import trash from '@Pimcore/assets/icons/trash.inline.svg?react'
import tree from '@Pimcore/assets/icons/tree.inline.svg?react'
import trimmer from '@Pimcore/assets/icons/trimmer.inline.svg?react'
import txtDocs from '@Pimcore/assets/icons/txt-docs.inline.svg?react'
import unknown from '@Pimcore/assets/icons/unknown.inline.svg?react'
import unlinkDocument from '@Pimcore/assets/icons/unlink-document.inline.svg?react'
import unlocked from '@Pimcore/assets/icons/unlocked.inline.svg?react'
import updateBuild from '@Pimcore/assets/icons/update-build.inline.svg?react'
import uploadCloud from '@Pimcore/assets/icons/upload-cloud.inline.svg?react'
import uploadImport from '@Pimcore/assets/icons/upload-import.inline.svg?react'
import uploadZip from '@Pimcore/assets/icons/upload-zip.inline.svg?react'
import upload from '@Pimcore/assets/icons/upload.inline.svg?react'
import urlSlug from '@Pimcore/assets/icons/url-slug.inline.svg?react'
import userSelect from '@Pimcore/assets/icons/user-select.inline.svg?react'
import user from '@Pimcore/assets/icons/user.inline.svg?react'
import usersX from '@Pimcore/assets/icons/users-x.inline.svg?react'
import vector from '@Pimcore/assets/icons/vector.inline.svg?react'
import videoThumbnail from '@Pimcore/assets/icons/video-thumbnail.inline.svg?react'
import video from '@Pimcore/assets/icons/video.inline.svg?react'
import view from '@Pimcore/assets/icons/view.inline.svg?react'
import voucher from '@Pimcore/assets/icons/voucher.inline.svg?react'
import warningCircle from '@Pimcore/assets/icons/warning-circle.inline.svg?react'
import webSettings from '@Pimcore/assets/icons/web-settings.inline.svg?react'
import webhook from '@Pimcore/assets/icons/webhook.inline.svg?react'
import widget from '@Pimcore/assets/icons/widget.inline.svg?react'
import workflow from '@Pimcore/assets/icons/workflow.inline.svg?react'
import wysiwygField from '@Pimcore/assets/icons/wysiwyg-field.inline.svg?react'
import xCircle from '@Pimcore/assets/icons/x-circle.inline.svg?react'
import xlsxCsv from '@Pimcore/assets/icons/xlsx-csv.inline.svg?react'
import zToAOrder from '@Pimcore/assets/icons/z-to-a-order.inline.svg?react'

moduleSystem.registerModule({
  onInit: () => {
    const iconLibrary = container.get<IconLibrary>(serviceIds.iconLibrary)
    iconLibrary.register({
      name: 'a-to-z-order',
      component: aToZOrder
    })
    iconLibrary.register({
      name: 'accessory',
      component: accessory
    })
    iconLibrary.register({
      name: 'accordion',
      component: accordion
    })
    iconLibrary.register({
      name: 'activities',
      component: activities
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
      name: 'addativ-pricing-rules',
      component: addativPricingRules
    })
    iconLibrary.register({
      name: 'advanced-many-to-many-object-relation',
      component: advancedManyToManyObjectRelation
    })
    iconLibrary.register({
      name: 'advanced-many-to-many-relation',
      component: advancedManyToManyRelation
    })
    iconLibrary.register({
      name: 'alert-outline',
      component: alertOutline
    })
    iconLibrary.register({
      name: 'alert',
      component: alert
    })
    iconLibrary.register({
      name: 'alternative-element-tree',
      component: alternativeElementTree
    })
    iconLibrary.register({
      name: 'appearance-branding',
      component: appearanceBranding
    })
    iconLibrary.register({
      name: 'application-logger',
      component: applicationLogger
    })
    iconLibrary.register({
      name: 'area-brick',
      component: areaBrick
    })
    iconLibrary.register({
      name: 'arrow-narrow-right',
      component: arrowNarrowRight
    })
    iconLibrary.register({
      name: 'arrow-square-right',
      component: arrowSquareRight
    })
    iconLibrary.register({
      name: 'asset-metadata-class-definition',
      component: assetMetadataClassDefinition
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
      name: 'autofill',
      component: autofill
    })
    iconLibrary.register({
      name: 'automation-action',
      component: automationAction
    })
    iconLibrary.register({
      name: 'automation-integration',
      component: automationIntegration
    })
    iconLibrary.register({
      name: 'batch-selection',
      component: batchSelection
    })
    iconLibrary.register({
      name: 'blank',
      component: blank
    })
    iconLibrary.register({
      name: 'block',
      component: block
    })
    iconLibrary.register({
      name: 'body-style',
      component: bodyStyle
    })
    iconLibrary.register({
      name: 'book-open-01',
      component: bookOpen01
    })
    iconLibrary.register({
      name: 'bookmark-list-asset-folder',
      component: bookmarkListAssetFolder
    })
    iconLibrary.register({
      name: 'bookmark-list-document-folder',
      component: bookmarkListDocumentFolder
    })
    iconLibrary.register({
      name: 'bookmark-list-object-folder',
      component: bookmarkListObjectFolder
    })
    iconLibrary.register({
      name: 'bookmark',
      component: bookmark
    })
    iconLibrary.register({
      name: 'boolean-select',
      component: booleanSelect
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
      name: 'cancel',
      component: cancel
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
      name: 'chart-scatter',
      component: chartScatter
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
      name: 'class',
      component: classIcon
    })
    iconLibrary.register({
      name: 'classification-store',
      component: classificationStore
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
      name: 'code',
      component: code
    })
    iconLibrary.register({
      name: 'collapse',
      component: collapse
    })
    iconLibrary.register({
      name: 'collection',
      component: collection
    })
    iconLibrary.register({
      name: 'color',
      component: color
    })
    iconLibrary.register({
      name: 'columns',
      component: columns
    })
    iconLibrary.register({
      name: 'combobox-field',
      component: comboboxField
    })
    iconLibrary.register({
      name: 'compare',
      component: compare
    })
    iconLibrary.register({
      name: 'content-duplicate',
      component: contentDuplicate
    })
    iconLibrary.register({
      name: 'content-settings',
      component: contentSettings
    })
    iconLibrary.register({
      name: 'content',
      component: content
    })
    iconLibrary.register({
      name: 'contrast-01',
      component: contrast01
    })
    iconLibrary.register({
      name: 'convert',
      component: convert
    })
    iconLibrary.register({
      name: 'copilot-job-runs',
      component: copilotJobRuns
    })
    iconLibrary.register({
      name: 'copilot',
      component: copilot
    })
    iconLibrary.register({
      name: 'copy-03',
      component: copy03
    })
    iconLibrary.register({
      name: 'copy',
      component: copy
    })
    iconLibrary.register({
      name: 'corner-up-left',
      component: cornerUpLeft
    })
    iconLibrary.register({
      name: 'counter',
      component: counter
    })
    iconLibrary.register({
      name: 'countries-multiple',
      component: countriesMultiple
    })
    iconLibrary.register({
      name: 'country-select',
      component: countrySelect
    })
    iconLibrary.register({
      name: 'crm',
      component: crm
    })
    iconLibrary.register({
      name: 'crop',
      component: crop
    })
    iconLibrary.register({
      name: 'custom-layout',
      component: customLayout
    })
    iconLibrary.register({
      name: 'custom-metadata',
      component: customMetadata
    })
    iconLibrary.register({
      name: 'customer-automation',
      component: customerAutomation
    })
    iconLibrary.register({
      name: 'customer-duplicate',
      component: customerDuplicate
    })
    iconLibrary.register({
      name: 'customer-management',
      component: customerManagement
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
      name: 'data-objects-importer',
      component: dataObjectsImporter
    })
    iconLibrary.register({
      name: 'data-quality',
      component: dataQuality
    })
    iconLibrary.register({
      name: 'datahub',
      component: datahub
    })
    iconLibrary.register({
      name: 'date-formatter',
      component: dateFormatter
    })
    iconLibrary.register({
      name: 'date-range',
      component: dateRange
    })
    iconLibrary.register({
      name: 'date-time-field',
      component: dateTimeField
    })
    iconLibrary.register({
      name: 'date',
      component: date
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
      name: 'document-configurations',
      component: documentConfigurations
    })
    iconLibrary.register({
      name: 'document-link',
      component: documentLink
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
      name: 'dynamic-permission',
      component: dynamicPermission
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
      name: 'email',
      component: email
    })
    iconLibrary.register({
      name: 'embedded-metadata',
      component: embeddedMetadata
    })
    iconLibrary.register({
      name: 'encrypted',
      component: encrypted
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
      name: 'expand-01',
      component: expand01
    })
    iconLibrary.register({
      name: 'expand',
      component: expand
    })
    iconLibrary.register({
      name: 'experience-commerce',
      component: experienceCommerce
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
      name: 'field-container',
      component: fieldContainer
    })
    iconLibrary.register({
      name: 'fieldset',
      component: fieldset
    })
    iconLibrary.register({
      name: 'file-check-03',
      component: fileCheck03
    })
    iconLibrary.register({
      name: 'file-export',
      component: fileExport
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
      name: 'formatters',
      component: formatters
    })
    iconLibrary.register({
      name: 'gdpr-extractor',
      component: gdprExtractor
    })
    iconLibrary.register({
      name: 'gender',
      component: gender
    })
    iconLibrary.register({
      name: 'geographical-bounds',
      component: geographicalBounds
    })
    iconLibrary.register({
      name: 'geographical-polygon',
      component: geographicalPolygon
    })
    iconLibrary.register({
      name: 'geographical-polyline',
      component: geographicalPolyline
    })
    iconLibrary.register({
      name: 'graph',
      component: graph
    })
    iconLibrary.register({
      name: 'graphql',
      component: graphql
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
      name: 'hardlink',
      component: hardlink
    })
    iconLibrary.register({
      name: 'heading',
      component: heading
    })
    iconLibrary.register({
      name: 'headless-brick',
      component: headlessBrick
    })
    iconLibrary.register({
      name: 'headless-document',
      component: headlessDocument
    })
    iconLibrary.register({
      name: 'headless-template',
      component: headlessTemplate
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
      name: 'image-advanced',
      component: imageAdvanced
    })
    iconLibrary.register({
      name: 'image-external',
      component: imageExternal
    })
    iconLibrary.register({
      name: 'image-gallery',
      component: imageGallery
    })
    iconLibrary.register({
      name: 'image-thumbnail-clear',
      component: imageThumbnailClear
    })
    iconLibrary.register({
      name: 'image-thumbnail',
      component: imageThumbnail
    })
    iconLibrary.register({
      name: 'image',
      component: image
    })
    iconLibrary.register({
      name: 'import-csv',
      component: importCsv
    })
    iconLibrary.register({
      name: 'import',
      component: importIcon
    })
    iconLibrary.register({
      name: 'index-field',
      component: indexField
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
      name: 'inline-help',
      component: inlineHelp
    })
    iconLibrary.register({
      name: 'input-quantity-value',
      component: inputQuantityValue
    })
    iconLibrary.register({
      name: 'interaction-action',
      component: interactionAction
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
      name: 'language-overview',
      component: languageOverview
    })
    iconLibrary.register({
      name: 'language-select',
      component: languageSelect
    })
    iconLibrary.register({
      name: 'last-rule-pricing-rules',
      component: lastRulePricingRules
    })
    iconLibrary.register({
      name: 'layout-grid-02',
      component: layoutGrid02
    })
    iconLibrary.register({
      name: 'layout',
      component: layout
    })
    iconLibrary.register({
      name: 'link-document',
      component: linkDocument
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
      name: 'locale-collector',
      component: localeCollector
    })
    iconLibrary.register({
      name: 'locale-switcher',
      component: localeSwitcher
    })
    iconLibrary.register({
      name: 'location-marker',
      component: locationMarker
    })
    iconLibrary.register({
      name: 'lock-circle',
      component: lockCircle
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
      name: 'manual-order',
      component: manualOrder
    })
    iconLibrary.register({
      name: 'many-to-many-object-relation',
      component: manyToManyObjectRelation
    })
    iconLibrary.register({
      name: 'many-to-many-relation',
      component: manyToManyRelation
    })
    iconLibrary.register({
      name: 'many-to-many',
      component: manyToMany
    })
    iconLibrary.register({
      name: 'many-to-one-relation',
      component: manyToOneRelation
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
      name: 'media',
      component: media
    })
    iconLibrary.register({
      name: 'menu-shortcut',
      component: menuShortcut
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
      name: 'monitor',
      component: monitor
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
      name: 'multiple-field',
      component: multipleField
    })
    iconLibrary.register({
      name: 'name',
      component: name
    })
    iconLibrary.register({
      name: 'navigation',
      component: navigation
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
      name: 'new-data-component',
      component: newDataComponent
    })
    iconLibrary.register({
      name: 'new-document',
      component: newDocument
    })
    iconLibrary.register({
      name: 'new-hotspot',
      component: newHotspot
    })
    iconLibrary.register({
      name: 'new-layout',
      component: newLayout
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
      name: 'newsletter-active',
      component: newsletterActive
    })
    iconLibrary.register({
      name: 'newsletter-confirmed',
      component: newsletterConfirmed
    })
    iconLibrary.register({
      name: 'no-content',
      component: noContent
    })
    iconLibrary.register({
      name: 'not-visible-element',
      component: notVisibleElement
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
      name: 'number-range',
      component: numberRange
    })
    iconLibrary.register({
      name: 'number-type',
      component: numberType
    })
    iconLibrary.register({
      name: 'object-bricks',
      component: objectBricks
    })
    iconLibrary.register({
      name: 'open-folder',
      component: openFolder
    })
    iconLibrary.register({
      name: 'openid-connect',
      component: openidConnect
    })
    iconLibrary.register({
      name: 'operator-concatenator',
      component: operatorConcatenator
    })
    iconLibrary.register({
      name: 'order',
      component: order
    })
    iconLibrary.register({
      name: 'other-operators',
      component: otherOperators
    })
    iconLibrary.register({
      name: 'other',
      component: other
    })
    iconLibrary.register({
      name: 'package',
      component: packageIcon
    })
    iconLibrary.register({
      name: 'page-static',
      component: pageStatic
    })
    iconLibrary.register({
      name: 'panel',
      component: panel
    })
    iconLibrary.register({
      name: 'password',
      component: password
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
      name: 'permission-many-to-one',
      component: permissionManyToOne
    })
    iconLibrary.register({
      name: 'permission-object',
      component: permissionObject
    })
    iconLibrary.register({
      name: 'permission-resource',
      component: permissionResource
    })
    iconLibrary.register({
      name: 'personal-user',
      component: personalUser
    })
    iconLibrary.register({
      name: 'phone-horizontal',
      component: phoneHorizontal
    })
    iconLibrary.register({
      name: 'phone',
      component: phone
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
      name: 'plus-circle',
      component: plusCircle
    })
    iconLibrary.register({
      name: 'plus-square',
      component: plusSquare
    })
    iconLibrary.register({
      name: 'portal-engine-collections',
      component: portalEngineCollections
    })
    iconLibrary.register({
      name: 'portal-engine-index',
      component: portalEngineIndex
    })
    iconLibrary.register({
      name: 'portal-engine-wizard',
      component: portalEngineWizard
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
      name: 'pricing-rules',
      component: pricingRules
    })
    iconLibrary.register({
      name: 'print-settings',
      component: printSettings
    })
    iconLibrary.register({
      name: 'printpage',
      component: printpage
    })
    iconLibrary.register({
      name: 'productsup',
      component: productsup
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
      name: 'quantity-value-range',
      component: quantityValueRange
    })
    iconLibrary.register({
      name: 'quantity-value',
      component: quantityValue
    })
    iconLibrary.register({
      name: 'questionmark',
      component: questionmark
    })
    iconLibrary.register({
      name: 'quick-access',
      component: quickAccess
    })
    iconLibrary.register({
      name: 'redirect',
      component: redirect
    })
    iconLibrary.register({
      name: 'refresh',
      component: refresh
    })
    iconLibrary.register({
      name: 'region',
      component: region
    })
    iconLibrary.register({
      name: 'relation',
      component: relation
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
      name: 'reporting',
      component: reporting
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
      name: 'restore',
      component: restore
    })
    iconLibrary.register({
      name: 'reverse-object-relation',
      component: reverseObjectRelation
    })
    iconLibrary.register({
      name: 'reverse',
      component: reverse
    })
    iconLibrary.register({
      name: 'robot',
      component: robot
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
      name: 'select-type',
      component: selectType
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
      name: 'settings-brightness',
      component: settingsBrightness
    })
    iconLibrary.register({
      name: 'settings',
      component: settings
    })
    iconLibrary.register({
      name: 'share-with-users',
      component: shareWithUsers
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
      name: 'shield-plus',
      component: shieldPlus
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
      name: 'simple-rest-service',
      component: simpleRestService
    })
    iconLibrary.register({
      name: 'slider',
      component: slider
    })
    iconLibrary.register({
      name: 'snippet',
      component: snippet
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
      name: 'structured-table',
      component: structuredTable
    })
    iconLibrary.register({
      name: 'style',
      component: style
    })
    iconLibrary.register({
      name: 'subscription-community',
      component: subscriptionCommunity
    })
    iconLibrary.register({
      name: 'subscription-enterprise',
      component: subscriptionEnterprise
    })
    iconLibrary.register({
      name: 'substring',
      component: substring
    })
    iconLibrary.register({
      name: 'system-columns',
      component: systemColumns
    })
    iconLibrary.register({
      name: 'system-settings',
      component: systemSettings
    })
    iconLibrary.register({
      name: 'tab-panel',
      component: tabPanel
    })
    iconLibrary.register({
      name: 'table',
      component: table
    })
    iconLibrary.register({
      name: 'tablet',
      component: tablet
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
      name: 'target-group',
      component: targetGroup
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
      name: 'test',
      component: test
    })
    iconLibrary.register({
      name: 'text-field',
      component: textField
    })
    iconLibrary.register({
      name: 'text-input',
      component: textInput
    })
    iconLibrary.register({
      name: 'thumbnail-html',
      component: thumbnailHtml
    })
    iconLibrary.register({
      name: 'time',
      component: time
    })
    iconLibrary.register({
      name: 'transfer',
      component: transfer
    })
    iconLibrary.register({
      name: 'transformers',
      component: transformers
    })
    iconLibrary.register({
      name: 'translate',
      component: translate
    })
    iconLibrary.register({
      name: 'translations',
      component: translations
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
      name: 'trimmer',
      component: trimmer
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
      name: 'unlink-document',
      component: unlinkDocument
    })
    iconLibrary.register({
      name: 'unlocked',
      component: unlocked
    })
    iconLibrary.register({
      name: 'update-build',
      component: updateBuild
    })
    iconLibrary.register({
      name: 'upload-cloud',
      component: uploadCloud
    })
    iconLibrary.register({
      name: 'upload-import',
      component: uploadImport
    })
    iconLibrary.register({
      name: 'upload-zip',
      component: uploadZip
    })
    iconLibrary.register({
      name: 'upload',
      component: upload
    })
    iconLibrary.register({
      name: 'url-slug',
      component: urlSlug
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
      name: 'video-thumbnail',
      component: videoThumbnail
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
      name: 'voucher',
      component: voucher
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
    iconLibrary.register({
      name: 'z-to-a-order',
      component: zToAOrder
    })
  }
})

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export const topics: Record<string, string> = {
  'patch-finished': 'patch-finished',
  'zip-download-ready': 'zip-download-ready',
  'csv-download-ready': 'csv-download-ready',
  'xlsx-download-ready': 'xlsx-download-ready',
  'handler-progress': 'handler-progress',
  'job-finished-with-errors': 'job-finished-with-errors',
  'job-failed': 'job-failed',
  'asset-upload-finished': 'asset-upload-finished',
  'zip-upload-finished': 'zip-upload-finished',
  'deletion-finished': 'deletion-finished',
  'cloning-finished': 'cloning-finished',
  'tag-assignment-finished': 'tag-assignment-finished',
  'tag-replacement-finished': 'tag-replacement-finished',
  'recycle-bin-restore-finished': 'recycle-bin-restore-finished',
  'recycle-bin-delete-finished': 'recycle-bin-delete-finished'
}

export const defaultTopics: string[] = [
  topics['handler-progress'],
  topics['job-finished-with-errors'],
  topics['job-failed']
]

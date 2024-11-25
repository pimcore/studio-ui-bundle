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

export const topics: Record<string, string> = {
  'patch-finished': 'patch-finished',
  'zip-download-ready': 'zip-download-ready',
  'csv-download-ready': 'csv-download-ready',
  'handler-progress': 'handler-progress',
  'job-finished-with-errors': 'job-finished-with-errors',
  'job-failed': 'job-failed',
  'asset-upload-finished': 'asset-upload-finished',
  'zip-upload-finished': 'zip-upload-finished',
  'deletion-finished': 'deletion-finished',
  'cloning-finished': 'cloning-finished',
  'tag-assignment-finished': 'tag-assignment-finished',
  'tag-replacement-finished': 'tag-replacement-finished'
}

export const defaultTopics: string[] = [
  topics['handler-progress'],
  topics['job-finished-with-errors'],
  topics['job-failed']
]

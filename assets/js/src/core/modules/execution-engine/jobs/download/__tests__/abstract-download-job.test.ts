/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractDownloadJob } from '../abstract-download-job'
import { downloadFromUrlWithCheck } from '@Pimcore/utils/files'
import { type JobButtonCustomizationContext } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-notification'
import { type ButtonAction } from '@Pimcore/modules/execution-engine/notification/job/job-view'

jest.mock('@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler', () => ({
  MessageBusJobHandler: jest.fn().mockImplementation(() => ({}))
}))
jest.mock('i18next', () => ({ t: (key: string) => key }))
jest.mock('@Pimcore/app/api/pimcore/route', () => ({ getPrefix: () => '' }))
jest.mock('@Pimcore/utils/files', () => ({
  downloadFromUrl: jest.fn(),
  downloadFromUrlWithCheck: jest.fn()
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  default: jest.fn(),
  GeneralError: class {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

const downloadFromUrlWithCheckMock = downloadFromUrlWithCheck as jest.MockedFunction<typeof downloadFromUrlWithCheck>

interface CustomizedButtons {
  handler: ButtonAction['handler']
  showWarning: jest.Mock
  hideNotification: jest.Mock
}

function customizeButtons (): CustomizedButtons {
  const customizer = AbstractDownloadJob.buildDownloadButton('/download/{jobRunId}')

  let capturedAction: ButtonAction | undefined
  const showWarning = jest.fn()
  const hideNotification = jest.fn(async () => {})

  const context: JobButtonCustomizationContext = {
    jobRunId: 7,
    addSuccessButton: (action) => { capturedAction = action },
    addFinishedWithErrorsButton: jest.fn(),
    addFailureButton: jest.fn(),
    showWarning,
    hideNotification
  }

  customizer(context)

  if (capturedAction === undefined) {
    throw new Error('Expected the download button to be added as a success button')
  }

  return { handler: capturedAction.handler, showWarning, hideNotification }
}

beforeEach(() => {
  downloadFromUrlWithCheckMock.mockReset()
})

describe('AbstractDownloadJob download button', () => {
  it('hides the notification after a successful download', async () => {
    downloadFromUrlWithCheckMock.mockResolvedValue(true)
    const { handler, showWarning, hideNotification } = customizeButtons()

    await handler()

    expect(downloadFromUrlWithCheckMock).toHaveBeenCalledWith('/download/7', '/download/7/available')
    expect(hideNotification).toHaveBeenCalledTimes(1)
    expect(showWarning).not.toHaveBeenCalled()
  })

  it('warns without hiding when the download is no longer available', async () => {
    downloadFromUrlWithCheckMock.mockResolvedValue(false)
    const { handler, showWarning, hideNotification } = customizeButtons()

    await handler()

    expect(showWarning).toHaveBeenCalledWith('jobs.job.download-error', 'jobs.job.download-not-available')
    expect(hideNotification).not.toHaveBeenCalled()
  })
})

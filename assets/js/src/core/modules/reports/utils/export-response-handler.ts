/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * A failed export answers with a JSON error body. Reading every response as a Blob would hide
 * that body from ApiError, so only a successful response is read as the file.
 */
export const exportResponseHandler = async (response: Response): Promise<Blob | unknown> =>
  response.ok ? await response.blob() : await response.json()

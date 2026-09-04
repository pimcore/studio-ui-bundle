/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The opaque id the server mints (bin2hex(random_bytes(32)) -> 64 lowercase hex).
// The value flows straight into the request path of the consent details/approve
// calls, so anything but this exact shape must be rejected — otherwise a crafted
// id such as "../../execution-engine/abort/1" would turn the decision buttons into
// a request to an unrelated endpoint.
const AUTHORIZATION_ID_PATTERN = /^[a-f0-9]{64}$/

/**
 * Returns the id only if it is the exact opaque format the server mints; otherwise
 * null, so a missing or crafted id is handled identically (the "expired" path) and
 * never reaches an API request path.
 */
export const sanitizeAuthorizationId = (raw: string | null): string | null =>
  raw !== null && AUTHORIZATION_ID_PATTERN.test(raw) ? raw : null

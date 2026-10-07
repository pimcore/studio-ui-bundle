/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNull } from 'lodash'

// The id is opaque per the API contract, so its shape is not assumed beyond what
// keeps it safe to interpolate: only RFC 3986 unreserved characters are accepted.
// The value flows into the request path of the consent details/approve calls, so a
// crafted id such as "../../execution-engine/abort/1" must never get through — it
// would turn the decision buttons into a request to an unrelated endpoint.
// Callers additionally encode the value (see oauth-consent-page), which is a no-op
// for this character set and a second barrier if the set is ever widened.
const AUTHORIZATION_ID_PATTERN = /^[A-Za-z0-9._~-]{1,256}$/

/**
 * Returns the id only if it is safe to use in a request path; otherwise null, so a
 * missing or crafted id is handled identically (the "expired" path) and never
 * reaches an API request path.
 */
export const sanitizeAuthorizationId = (raw: string | null): string | null =>
  !isNull(raw) && AUTHORIZATION_ID_PATTERN.test(raw) ? raw : null

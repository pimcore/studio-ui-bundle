/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  getMercureProtocolVersion,
  type MercureProtocolVersion
} from '@Pimcore/modules/app/mercure/mercure-authorization'

/**
 * 1.x hubs reject `topic` with 400, 0.x hubs need it and ignore `match`, so the parameters must
 * follow the hub's protocol.
 */
const PARAMETERS: Record<MercureProtocolVersion, { topic: string, lastEventId: string }> = {
  '0.x': { topic: 'topic', lastEventId: 'lastEventID' },
  '1.0': { topic: 'match', lastEventId: 'last_event_id' }
}

export const buildMercureSubscriptionUrl = (
  hubUrl: string,
  topics: string[],
  lastEventId?: string,
  protocolVersion: MercureProtocolVersion = getMercureProtocolVersion()
): URL => {
  const url = new URL(hubUrl)
  const parameters = PARAMETERS[protocolVersion]

  topics.forEach(topic => {
    url.searchParams.append(parameters.topic, topic)
  })

  if (lastEventId !== undefined) {
    url.searchParams.append(parameters.lastEventId, lastEventId)
  }

  return url
}

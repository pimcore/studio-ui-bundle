/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { type JobProps } from '../notification/job/job'

export type JobComponentType = React.ComponentType<JobProps>

@injectable()
export class JobComponentRegistry {
  private readonly components = new Map<string, JobComponentType>()

  registerComponent (type: string, component: JobComponentType): void {
    this.components.set(type, component)
  }

  getComponentByType (type: string): JobComponentType | undefined {
    return this.components.get(type)
  }
}

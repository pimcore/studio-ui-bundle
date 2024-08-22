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

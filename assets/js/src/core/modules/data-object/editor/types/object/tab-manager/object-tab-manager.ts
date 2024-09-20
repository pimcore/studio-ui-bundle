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

import { TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'
import { type IElementEditorTabManager } from '@Pimcore/modules/element/editor/tab-manager/interface/IElementEditorTabManager'
import { injectable } from 'inversify'

@injectable()
export class ObjectTabManager extends TabManager implements IElementEditorTabManager {
  constructor () {
    super()
    this.type = 'object'
  }
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { TitleContainer } from '@Pimcore/modules/user/profile/title/title-container'
import { type Widget } from '@Pimcore/modules/widget-manager/services/widget-registry'
import {ProfileContainer} from "@Pimcore/modules/user/profile/profile-container";

export const UserProfileWidget: Widget = {
    name: 'user-profile',
    component: ProfileContainer,
    titleComponent: TitleContainer
}

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import type {WidgetManagerTabConfig} from "@Pimcore/modules/widget-manager/widget-manager-slice";
import {ContentLayout} from '@Pimcore/components/content-layout/content-layout'
import {Content} from "@Pimcore/components/content/content";
import {useUser} from "@Pimcore/modules/auth/hooks/use-user";
import {useUserDraft} from "@Pimcore/modules/auth/hooks/use-user-draft";
import {Toolbar} from "@Pimcore/modules/auth/profile/toolbar/toolbar";
import {ProfileDetail} from "@Pimcore/modules/auth/profile/profile-detail";

export const USERPROFILE: WidgetManagerTabConfig = {
    component: 'user-profile',
    name: 'user-profile',
    id: 'user-profile',
    config: {
        translationKey: 'user-profile.label',
        icon: {
            type: 'name',
            value: 'user'
        }
    }
}

const ProfileContainer = (): React.JSX.Element => {
    const user = useUser()
    const { isLoading } = useUserDraft()

    return (
        <ContentLayout
            renderToolbar={
            <Toolbar id={ user.id }/>
        }
        >
            <Content padded loading={isLoading}>
                <ProfileDetail id={user.id} />
            </Content>
        </ContentLayout>
    )
}

export { ProfileContainer }

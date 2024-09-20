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

import {type Meta} from '@storybook/react'
import {Tag} from "@Pimcore/components/tag/tag";
import React from 'react';

const config: Meta = {
    title: 'Components/General/Tag',
    component: Tag,
    tags: ['autodocs']
}

export default config

export const _default = {
    args: {
        tagText: 'default'
    }
}

export const SuccessIconTag = {
    args: {
        iconName: 'world',
        color: 'success',
        tagText: "Published"
    }
}

export const OwnDraftIconTag = {
    args: {
        iconName: 'user',
        color: 'blue',
        tagText: "Own draft"
    }
}

export const TransparentTheme = {
    args: {
        theme: 'transparent',
        tagText: "ID: 150",
        wrapperStyle: {
            backgroundColor: 'rgba(215, 199, 236, 0.4)',
            padding: '10px',
            borderRadius: '4px',
        }
    },
    render: (args) => (
        <div style={args.wrapperStyle}>
            <Tag {...args} />
        </div>
    )
}

export const AdminRoleTheme = {
    args: {
        theme: 'admin-role',
        tagText: "Jane Doe"
    }
}

export const UserRoleTheme = {
    args: {
        theme: 'user-role',
        tagText: "Jane Doe"
    }
}

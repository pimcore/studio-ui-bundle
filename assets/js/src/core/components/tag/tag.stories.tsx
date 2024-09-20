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
        text: 'default'
    }
}

export const ColorSuccessIconTag = {
    args: {
        iconName: 'world',
        color: 'success',
        text: "Published"
    }
}

export const ColorBlueIconTag = {
    args: {
        iconName: 'user',
        color: 'blue',
        text: "Own draft"
    }
}

export const ThemeTransparent = {
    args: {
        theme: 'transparent',
        text: "ID: 150",
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

export const ThemeAdminRole = {
    args: {
        theme: 'admin-role',
        text: "Jane Doe"
    }
}

export const ThemeUserRole = {
    args: {
        theme: 'user-role',
        text: "Jane Doe"
    }
}

export const ThemeLinkBlue = {
    args: {
        theme: 'link-blue',
        text: "Car Images/Jaguar"
    }
}

export const ThemeLinkPurple = {
    args: {
        theme: 'link-purple',
        text: "Car Images/BMW"
    }
}

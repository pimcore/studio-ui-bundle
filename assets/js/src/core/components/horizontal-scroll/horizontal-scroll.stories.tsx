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
import {HorizontalScroll} from './horizontal-scroll'
import {TagList} from "@Pimcore/components/tag-list/tag-list";
import React from "react";
import type {TagProps} from "@Pimcore/components/tag/tag";

const config: Meta = {
    title: 'Components/layout/HorizontalScroll',
    component: HorizontalScroll,
    parameters: {
        layout: 'centered'
    },

    tags: ['autodocs']
}

export default config

const exampleLargeTagList: TagProps[][] = [
    [
        {children: 'Tag 1'},
        {children: 'Tag 2'},
        {children: 'Tag 3'},
        {children: 'Tag 4'},
        {children: 'Tag 5'},
        {children: 'Tag 6'}
    ]
]

const exampleSmallTagList: TagProps[][] = [
    [
        {children: 'Tag 1'},
        {children: 'Tag 2'},
        {children: 'Tag 3'}
    ]
]

export const _default = {
    args: {
        children: <TagList
            itemGap={'extra-small'}
            list={exampleLargeTagList}
            wrap={false}
        />,
        scrollWidth: 150
    }
}

export const ScrollNotRequired = {
    args: {
        children: <TagList
            itemGap={'extra-small'}
            list={exampleSmallTagList}
            wrap={false}
        />,
        scrollWidth: 150
    }
}

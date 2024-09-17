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
import {Tag} from 'antd'
import {AccordionTimeline} from "@Pimcore/components/accordion-timeline/accordion-timeline";
import {AccordionItemType} from "@Pimcore/components/accordion/accordion";
import {Icon} from "@Pimcore/components/icon/icon";
import React from "react";

const config: Meta = {
    title: 'Components/Layout/AccordionTimeline',
    component: AccordionTimeline,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs']
}
export default config

const item1: AccordionItemType = {
    key: '1',
    theme: 'success',
    title: <span>This is panel header 1</span>,
    subtitle: <span style={{color: 'grey'}}>I ate a clock yesterday, and it was so time-consuming, especially when I went back for seconds!</span>,

    extra: <Tag className={['title-tag', 'title-tag__published'].join(' ')}>
        <Icon
            className="tag-icon"
            name="world"
            options={{width: '12px', height: '12px'}}
        />
        Published
    </Tag>,
    children: <p>Mount Vesuvius is a stratovolcano, which is an extremely deadly form of volcano.</p>
}

const successItem: AccordionItemType = {
    key: '2',
    title: <span>This is panel header 2</span>,
    subtitle: <span style={{color: 'grey'}}>I ate a clock yesterday, and it was so time-consuming, especially when I went back for seconds!</span>,
    children: <p>Mount Vesuvius is a stratovolcano, which is an extremely deadly form of volcano.</p>
}

const items = [
    item1, successItem
];

export const DefaultAccordionTimeline = {
    args: {
        items: items
    }
}

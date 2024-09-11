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
import {Accordion, AccordionItemType} from './accordion'
import {type CollapseProps, Tag} from 'antd'
import React from 'react'
import {Icon} from '@Pimcore/components/icon/icon'

const config: Meta = {
    title: 'Components/Layout/Accordion',
    component: Accordion,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs']
}
export default config

const item1: AccordionItemType = {
    key: '1',
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

const item2: AccordionItemType = {
    key: '2',
    title: <span>This is panel header 2</span>,
    children: <p>The ancient Egyptians were the first to tame the cat (in about 3000 BC), and used them to control
        pests.</p>
}


const item3: AccordionItemType = {
    key: '3',
    title: <span>This is panel header 3</span>,
    children: <p></p>,
    disabled: true
}

const items: CollapseProps['items'] = [
    item1,
    item2
]
export const DefaultSinglePanel = {
    args: {
        items: [item1],
    }
}

export const ChevronLeft = {
    args: {
        items: [item1],
        expandIconPosition: 'start'
    }
}

export const CollapseDisabled = {
    args: {
        items: [item3],
    }
}

export const Ghost = {
    args: {
        items,
        ghost: true,
    }
}

export const Spaced = {
    args: {
        items,
        spaced: true,
    }
}

export const ActiveKeyControlled = {
    args: {
        items,
        spaced: true,
        activeKey: '2'
    }
}


export const ExclusiveAccordion = {
    args: {
        items,
        spaced: true,
        accordion:true
    }
}


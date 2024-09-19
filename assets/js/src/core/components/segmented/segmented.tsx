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

import React, {RefObject} from "react";
import {useStyles} from "@Pimcore/components/segmented/segmented.styles"
import {Segmented as AntdSegmented} from "antd";
import type {SegmentedProps as AntdSegmentedProps} from "antd/es/segmented";

export interface SegmentedProps extends AntdSegmentedProps<string> {
    onChange: () => void
}

const Segmented = ({
                       onChange,
                       options,
                       ...props
                   }: SegmentedProps, ref: RefObject<HTMLButtonElement | null>): React.JSX.Element => {
    const {styles} = useStyles()

    return (
        <div className={styles.segmented}>
            <AntdSegmented<string>
                onChange={onChange}
                options={options}
            />
        </div>)
}
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
import React from "react";
import {Collapse, CollapseProps, theme} from "antd";
import {useStyles} from "@Pimcore/components/accordion/accordion.styles";

export interface AccordionProps extends CollapseProps{
}

export const Accordion = ({items}: AccordionProps): React.JSX.Element => {

    const { styles } = useStyles()


    return (
      <Collapse
          className={[styles.accordion, 'accordion'].join(' ')}
          items={items}
          defaultActiveKey={['1']}
          expandIconPosition = 'end'
      />
  )
}

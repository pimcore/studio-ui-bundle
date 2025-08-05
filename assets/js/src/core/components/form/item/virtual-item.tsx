import { FormItemProps } from "antd";
import React, { useMemo } from "react";
import { ItemProvider } from "./provider/item/item-provider";
import { useStyles } from "./virtual-item.styles";
import { Space } from "@Pimcore/components/space/space";

export interface VirtualItemProps extends FormItemProps {
  children?: React.ReactNode;
}

export const VirtualItem = ({ children, ...props }: VirtualItemProps): React.JSX.Element => {
  const { label, className, hidden, id, rules } = props;
  const {styles} = useStyles();

  const isRequired = useMemo(() => {
    if (rules && Array.isArray(rules)) {
      return rules.some(rule => "required" in rule && rule.required);
    }
    return false;
  }, [rules]);

  return (
    <ItemProvider item={props}>
      <div className={[className, styles.virtualItem].join(' ')} style={{ display: hidden ? 'none' : 'block' }}>
        {label && (
          <div className="virtual-item__label">
            <Space size="mini">
              <label htmlFor={id}>
                <Space size="mini">
                  {label}
                </Space>
              </label> 
              {isRequired && <span className="required-indicator">*</span>}
            </Space>
          </div>
        )}
        
        <div>
          {children}
        </div>
      </div>
    </ItemProvider>
  );
}

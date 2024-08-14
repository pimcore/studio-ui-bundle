import React, { ChangeEvent, useMemo, useState } from "react";
import { serviceIds } from "@Pimcore/app/config/services";
import { useInjection } from "@Pimcore/app/depency-injection"
import { IconLibrary } from "@Pimcore/modules/icon-library/services/icon-library";
import { Icon } from "@Pimcore/components/icon/icon";
import { Card, Flex, Form, Space } from "antd";
import Search from "antd/es/input/Search";
import { useMessage } from "@Pimcore/components/message/useMessage";

export const IconLibraryOverview = () => {
  const iconLibrary = useInjection<IconLibrary>(serviceIds.iconLibrary)
  const icons = iconLibrary.getIcons();
  const [searchValue, setSearchValue] = useState<string>('');
  const { success, error } = useMessage();

  const filteredIcons = useMemo(() => {
    return Array.from(icons).filter(([name]) => name.includes(searchValue));
  }, [icons, searchValue]);

  return (
    <Space direction="vertical" style={{padding: 20, width: '100%'}}>
      <Form.Item label="Search">
        <Search value={searchValue} onChange={onSearch} />
      </Form.Item>

      <Flex wrap gap={16}>
        {Array.from(filteredIcons).map(([name]) => (
          <Card key={name} style={{ width: 150, height: 150 }} onClick={() => copy(name)}>
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <Icon name={name} options={{ height: 60, width: 60 }}/>
              <span>{name}</span>
            </Space>
          </Card>
        ))}
      </Flex>
    </Space>
  )

  function copy(name: string) {
    const promise = navigator.clipboard.writeText(name);

    promise.then(() => {
      success('Copied to clipboard');
    }).catch(() => {
      error('Failed to copy to clipboard');
    });
  }

  function onSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }
}

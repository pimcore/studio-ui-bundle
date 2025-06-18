/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, {useCallback, useEffect, useState} from 'react'
import {Form} from "@Pimcore/components/form/form";
import {Col, Input, Row} from "antd";
import {Accordion} from "@Pimcore/components/accordion/accordion";
import {Switch} from "@Pimcore/components/switch/switch";
import {useTranslation} from "react-i18next";
import {Select} from "@Pimcore/components/select/select";
import {IconButton} from "@Pimcore/components/icon-button/icon-button";
import {generatePassword} from "@Pimcore/modules/user/management/detail/tabs/settings/settings-helper";
import {UserAvatar} from "@Pimcore/modules/user/management/detail/tabs/settings/components/user-avatar";
import {useSettings} from "@Pimcore/modules/app/settings/hooks/use-settings";
import {
    EditorSettingsAccordion
} from "@Pimcore/modules/user/management/detail/tabs/settings/components/form/editor-settings-accordion";
import {KeyBindings} from "@Pimcore/modules/user/management/detail/tabs/key-bindings/key-bindings";
import {useUserDraft} from "@Pimcore/modules/auth/hooks/use-user-draft";
import {debounce} from "lodash";
import {Content} from "@Pimcore/components/content/content";

interface IProfileDetail {
    id: number
}

const ProfileDetail = ({id}:IProfileDetail): React.JSX.Element => {
    const [form] = Form.useForm()
    const { t } = useTranslation()
    const { availableAdminLanguages } = useSettings()
    const { user, setModifiedCells } = useUserDraft()
    const [keyBindingsModified, setKeyBindingsModified] = useState(false)

    useEffect(() => {
        if (user?.modified === false) {
            form.setFieldsValue({
                firstname: user?.firstname,
                lastname: user?.lastname,
                email: user?.email,
                language: user?.language,
                memorizeTabs: user?.memorizeTabs,
                welcomeScreen: user?.welcomeScreen,
                keyBindings: user?.keyBindings,
                contentLanguages: user?.contentLanguages
            })

            setKeyBindingsModified(false)
        }
    }, [user?.modified])

    const handleOnChangeKeyBindings = (name: string, code: object): void => {
        let modifiedKeyBindings = user?.modifiedCells?.keyBindings ?? []

        modifiedKeyBindings = modifiedKeyBindings.some((keyBinding) => keyBinding.action === name) ?
            modifiedKeyBindings.map((keyBinding) => keyBinding.action === name ? { ...keyBinding, ...code } : keyBinding)
            : [...modifiedKeyBindings, { action: name, ...code }];

        setModifiedCells({keyBindings: modifiedKeyBindings})
        setKeyBindingsModified(true)
    }

    const handleOnResetKeyBindings = async (items) => {
        setModifiedCells({keyBindings: items})
        setKeyBindingsModified(false)
    }

    const onValuesChange = useCallback(
        debounce((changedValues, allValues) => {
            setModifiedCells(changedValues);
        }, 300),
        [setModifiedCells, form]
    );

    if (!user) {
        return <Content none></Content>
    }

    return (
        <Form form={ form } layout="vertical" onValuesChange={ onValuesChange }>
            <Row gutter={ [10, 10] }>
                <Col span={ 8 }>
                    <Accordion
                        activeKey={ '1' }
                        bordered
                        items={ [
                            {
                                key: '1',
                                title: <>{ t('user-management.general') }</>,
                                children: <>
                                    <Form.Item
                                        label={ t('user-management.firstname') }
                                        name="firstname"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label={ t('user-management.lastname') }
                                        name="lastname"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label={ t('user-management.email') }
                                        name="email"
                                    >
                                        <Input type={ 'email' } />
                                    </Form.Item>

                                    <Form.Item
                                        label={ t('user-management.language') }
                                        name="language"
                                    >
                                        <Select
                                            options={ availableAdminLanguages.map((language) => ({
                                                value: language.language,
                                                label: language.display
                                            })) }
                                            placeholder={ t('user-management.language') }
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={ 'TODO ' + t('user-management.dateTime') }
                                        name="dateTime"
                                    >
                                        <Select
                                            options={ availableAdminLanguages.map((language) => ({
                                                value: language.language,
                                                label: language.display
                                            })) }
                                            placeholder={ t('user-management.dateTime') }
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="welcomeScreen"
                                    >
                                        <Switch labelRight={ t('user-management.welcomeScreen') } />
                                    </Form.Item>

                                    <Form.Item
                                        name="memorizeTabs"
                                    >
                                        <Switch labelRight={ t('user-management.memorizeTabs') } />
                                    </Form.Item>
                                </>
                            }
                        ]
                        }
                        size={ 'small' }
                    />
                </Col>
                <Col span={ 6 }>
                    <UserAvatar user={user}/>
                </Col>
                <Col span={ 14 }>
                    <Accordion
                        activeKey={ '2' }
                        bordered
                        items={ [
                            {
                                key: '2',
                                title: <>{ t('user-profile.change-password') }</>,
                                children: <>
                                    <Form.Item
                                        label={ t('user-profile.password-old') }
                                        name={ 'passwordOld' }
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label={ t('user-profile.password-new') }
                                        name={ 'password' }
                                        rules={ [{ min: 10 }] }
                                    >
                                        <Input suffix={ <IconButton
                                            icon={ { value: 'locked' } }
                                            onClick={ () => {
                                                const newPassword = generatePassword()
                                                form.setFieldValue('password', newPassword);
                                            } }
                                            title={ t('user-management.generate-password') }
                                        /> }
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={ t('user-profile.password-repeat') }
                                        name={ 'passwordConfirmation' }
                                        dependencies={['password']}
                                        rules={ [{ min: 10 }, ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error(t('user-profile.password-repeat-error')));
                                            },
                                        }),] }
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </>
                            }
                        ]
                        }
                        size={ 'small' }
                    />
                </Col>
                <Col span={ 14 }>
                    <EditorSettingsAccordion
                        data={ user?.contentLanguages }
                        onChange={ (languages) => { setModifiedCells({ contentLanguages: languages }) } }
                    />
                </Col>
            </Row>
            <Row gutter={ [10, 10] } className={'m-t-extra-large'}>
                <Col span={ 24 }>
                    <KeyBindings modified={keyBindingsModified} values={user?.keyBindings} onResetKeyBindings={handleOnResetKeyBindings} onChange={handleOnChangeKeyBindings} />
                </Col>
            </Row>
        </Form>
    )
}

export { ProfileDetail }

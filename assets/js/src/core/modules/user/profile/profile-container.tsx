/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, {useEffect} from 'react'
import type {WidgetManagerTabConfig} from "@Pimcore/modules/widget-manager/widget-manager-slice";
import {Content} from "@Pimcore/components/content/content";
import {Form} from "@Pimcore/components/form/form";
import {Col, Input, Row} from "antd";
import {Accordion} from "@Pimcore/components/accordion/accordion";
import {Switch} from "@Pimcore/components/switch/switch";
import {useTranslation} from "react-i18next";
import {Select} from "@Pimcore/components/select/select";
import {IconButton} from "@Pimcore/components/icon-button/icon-button";
import {generatePassword} from "@Pimcore/modules/user/management/detail/tabs/settings/settings-helper";
import {UserAvatar} from "@Pimcore/modules/user/management/detail/tabs/settings/components/user-avatar";
import {useUser} from "@Pimcore/modules/auth/hooks/use-user";
import {useSettings} from "@Pimcore/modules/app/settings/hooks/use-settings";
import {
    EditorSettingsAccordion
} from "@Pimcore/modules/user/management/detail/tabs/settings/components/form/editor-settings-accordion";
import {KeyBindings} from "@Pimcore/modules/user/management/detail/tabs/key-bindings/key-bindings";
import {useUserHelper} from "@Pimcore/modules/user/hooks/use-user-helper";

export const USERPROFILE: WidgetManagerTabConfig = {
    component: 'user-profile',
    name: 'user-profile',
    id: 'user-profile',
    config: {
        translationKey: 'user-profile.label',
        icon: {
            type: 'name',
            value: 'user'
        }
    }
}

const ProfileContainer = ({ ...props }): React.JSX.Element => {
    const [form] = Form.useForm()
    const { t } = useTranslation()
    const { availableAdminLanguages } = useSettings()
    const user = useUser()
    const { getDefaultKeyBindings } = useUserHelper()

    useEffect(() => {
        form.setFieldsValue({
            classes: user?.classes,
            username: user?.username,
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,
            language: user?.language,
            memorizeTabs: user?.memorizeTabs,
            welcomeScreen: user?.welcomeScreen,
            keyBindings: user?.keyBindings,
        })

    }, [user])

    console.log(user)
    const changeUserInState = (data: any) => {
        console.log('changeUserInState', data)
    }

    const [defaultKeyBindings, setDefaultKeyBindings] = React.useState<any>(user?.keyBindings)

    if (defaultKeyBindings?.length === 0) {
        getDefaultKeyBindings().then((data) => {
            setDefaultKeyBindings(data.items)
        })
    }

    const handleOnChange = (name: string, code: object, combination: string, updateInState: boolean = true): void => {
        console.log('handleOnChange', name, code, combination, updateInState)
    }

    const handleOnReset = async () => {
        console.log('handleOnReset')
    }

    return (
        <Content padded>
            <Form form={ form } layout="vertical">
                <Row gutter={ [10, 10] }>
                    <Col span={ 8 }>
                        <Accordion
                            activeKey={ '1' }
                            bordered
                            items={ [
                                {
                                    key: '1',
                                    title: <>{ t('user-profile.general') }</>,
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
                    <Col span={ 8 }>
                        <UserAvatar id={ user.id } />
                    </Col>
                    <Col span={ 16 }>
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
                                            name={ 'passwordold' }
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label={ t('user-profile.password-new') }
                                            name={ 'password' }
                                            rules={ [{ min: 10 }] }
                                        >
                                            <Input suffix={ <IconButton
                                                icon={ { value: 'lightning-01' } }
                                                onClick={ () => {
                                                    const newPassword = generatePassword()
                                                    form.setFieldValue('password', newPassword); changeUserInState({ password: newPassword })
                                                } }
                                                title={ t('user-management.generate-password') }
                                            /> }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={ t('user-profile.password-repeat') }
                                            name={ 'password-repeat' }
                                            rules={ [{ min: 10 }] }
                                        >
                                            <Input />
                                        </Form.Item>
                                    </>
                                }
                            ]
                            }
                            size={ 'small' }
                        />
                    </Col>
                    <Col span={ 16 }>
                        <EditorSettingsAccordion
                            data={ user?.contentLanguages }
                            onChange={ (languages) => { changeUserInState({ contentLanguages: languages }) } }
                        />
                    </Col>
                    <Col span={ 16 }>
                        <KeyBindings values={defaultKeyBindings} onResetKeyBindings={handleOnReset} onChange={handleOnChange} />
                    </Col>
                </Row>
            </Form>
        </Content>

    )
}

export { ProfileContainer }

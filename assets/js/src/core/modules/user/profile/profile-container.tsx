/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, {useCallback, useEffect} from 'react'
import type {WidgetManagerTabConfig} from "@Pimcore/modules/widget-manager/widget-manager-slice";
import {ContentLayout} from '@Pimcore/components/content-layout/content-layout'
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
import {useUserDraft} from "@Pimcore/modules/user/hooks/use-user-draft";
import {Toolbar} from "@Pimcore/modules/user/management/toolbar/toolbar";
import {debounce} from "lodash";

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
    const { user:userState, isLoading, updateUserKeyBinding, changeUserInState } = useUserDraft(user.id)

    const { getDefaultKeyBindings } = useUserHelper()
    const [defaultKeyBindings, setDefaultKeyBindings] = React.useState<any>(userState?.keyBindings)

    useEffect(() => {
        form.setFieldsValue({
            classes: userState?.classes,
            username: userState?.username,
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            email: userState?.email,
            language: userState?.language,
            memorizeTabs: userState?.memorizeTabs,
            welcomeScreen: userState?.welcomeScreen,
            keyBindings: userState?.keyBindings,
            active: userState?.active,
            admin: userState?.admin,
            allowDirtyClose: userState?.allowDirtyClose,
            assetWorkspaces: userState?.assetWorkspaces,
            closeWarning: userState?.closeWarning,
            contentLanguages: userState?.contentLanguages,
            dataObjectWorkspaces: userState?.dataObjectWorkspaces,
            documentWorkspaces: userState?.documentWorkspaces,
            parentId: userState?.parentId,
            permissions: userState?.permissions ?? [],
            perspectives: userState?.perspectives ?? [],
            roles: userState?.roles ?? [],
            twoFactorAuthenticationEnabled: userState?.twoFactorAuthenticationEnabled,
            websiteTranslationLanguagesEdit: userState?.websiteTranslationLanguagesEdit ?? [],
            websiteTranslationLanguagesView: userState?.websiteTranslationLanguagesView ?? [],
        })

    }, [userState])

    if (defaultKeyBindings?.length === 0) {
        getDefaultKeyBindings().then((data) => {
            setDefaultKeyBindings(data.items)
        })
    }

    const handleOnChangeKeyBindings = (name: string, code: object, combination: string, updateInState: boolean = true): void => {
        form.setFieldsValue({
            [name]: combination
        })

        if (updateInState) {
            updateUserKeyBinding(name, code)
        }
    }

    const handleOnResetKeyBindings = async () => {
        console.log('handleOnReset')
    }

    const onValuesChange = useCallback(
        debounce((changedValues, allValues) => {
            // if (changedValues.permissionsDefault !== undefined || changedValues.permissionsBundles !== undefined) {
            //     allValues.permissions = [
            //         ...changedValues.permissionsDefault ?? allValues.permissionsDefault ?? [],
            //         ...changedValues.permissionsBundles ?? allValues.permissionsBundles ?? []
            //     ]
            // }
            changeUserInState(allValues)
        }, 300),
        [changeUserInState]
    )

    return (
        <ContentLayout
            renderToolbar={
            <Toolbar id={ user.id }/>
        }
        >
            <Content padded loading={isLoading}>
                <Form form={ form } layout="vertical" onValuesChange={ onValuesChange }>
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
                        <Col span={ 6 }>
                            <UserAvatar id={ user.id } />
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
                        <Col span={ 14 }>
                            <EditorSettingsAccordion
                                data={ userState?.contentLanguages }
                                onChange={ (languages) => { changeUserInState({ contentLanguages: languages }) } }
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [10, 10] } className={'m-t-extra-large'}>
                        <Col span={ 24 }>
                            <KeyBindings values={defaultKeyBindings} onResetKeyBindings={handleOnResetKeyBindings} onChange={handleOnChangeKeyBindings} />
                        </Col>
                    </Row>
                </Form>
            </Content>
        </ContentLayout>
    )
}

export { ProfileContainer }

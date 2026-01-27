import { api } from "@sdk/api";
export const addTagTypes = ["Settings Admin", "Settings"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            adminSettingsGet: build.query<AdminSettingsGetApiResponse, AdminSettingsGetApiArg>({
                query: () => ({ url: `/pimcore-studio/api/settings/admin` }),
                providesTags: ["Settings Admin"],
            }),
            adminSettingsUpdate: build.mutation<AdminSettingsUpdateApiResponse, AdminSettingsUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/settings/admin/save`,
                    method: "POST",
                    body: queryArg.updateAdminSettings,
                }),
                invalidatesTags: ["Settings Admin"],
            }),
            settingAdminThumbnail: build.query<SettingAdminThumbnailApiResponse, SettingAdminThumbnailApiArg>({
                query: () => ({ url: `/pimcore-studio/api/setting/admin/thumbnail` }),
                providesTags: ["Settings Admin"],
            }),
            settingsCountryCollection: build.query<
                SettingsCountryCollectionApiResponse,
                SettingsCountryCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/settings/available-countries` }),
                providesTags: ["Settings"],
            }),
            systemSettingsGet: build.query<SystemSettingsGetApiResponse, SystemSettingsGetApiArg>({
                query: () => ({ url: `/pimcore-studio/api/settings` }),
                providesTags: ["Settings"],
            }),
            activeBundlesGet: build.query<ActiveBundlesGetApiResponse, ActiveBundlesGetApiArg>({
                query: () => ({ url: `/pimcore-studio/api/settings/active-bundles` }),
                providesTags: ["Settings"],
            }),
            pingAction: build.query<PingActionApiResponse, PingActionApiArg>({
                query: () => ({ url: `/pimcore-studio/api/settings/ping` }),
                providesTags: ["Settings"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type AdminSettingsGetApiResponse = /** status 200 Admin system settings data */ AdminSettings;
export type AdminSettingsGetApiArg = void;
export type AdminSettingsUpdateApiResponse = unknown;
export type AdminSettingsUpdateApiArg = {
    updateAdminSettings: UpdateAdminSettings;
};
export type SettingAdminThumbnailApiResponse = /** status 200 Success */ AdminSettingsThumbnailPath;
export type SettingAdminThumbnailApiArg = void;
export type SettingsCountryCollectionApiResponse = /** status 200 List of available countries */ {
    totalItems: number;
    items: AvailableCountry[];
};
export type SettingsCountryCollectionApiArg = void;
export type SystemSettingsGetApiResponse = /** status 200 System settings data */ {
    [key: string]: any;
};
export type SystemSettingsGetApiArg = void;
export type ActiveBundlesGetApiResponse = /** status 200 List of active bundles */ {
    /** List of active and installed bundles in the system. */
    bundles: ActiveBundle[];
};
export type ActiveBundlesGetApiArg = void;
export type PingActionApiResponse = unknown;
export type PingActionApiArg = void;
export type RelatedElementData = {
    /** ID */
    id: number;
    /** Type of the element */
    type: string;
    /** Subtype of the element */
    subtype: string;
    /** Full path of the element */
    fullPath: string;
    /** Is the element published */
    isPublished: boolean | null;
};
export type Branding = {
    /** Background shade */
    backgroundShade: string;
    /** Brand color */
    brandColor: string;
    /** Custom image for login screen */
    loginScreenCustomBackgroundImage: RelatedElementData | null;
    /** Custom logo */
    customLogo?: RelatedElementData | null;
};
export type Assets = {
    /** Hide edit image button */
    hide_edit_image: boolean;
    /** Disable tree preview */
    disable_tree_preview: boolean;
};
export type AdminSettings = {
    /** Branding configuration */
    branding: Branding;
    /** Assets configuration */
    assets: Assets;
    /** Whether the settings are writeable */
    writeable: boolean;
};
export type Error = {
    /** Message */
    message: string;
};
export type DevError = {
    /** Message */
    message: string;
    /** Details */
    details: string;
};
export type UpdateAdminSettings = {
    /** Branding configuration */
    branding: Branding;
    /** Assets configuration */
    assets: Assets;
};
export type AdminSettingsThumbnailPath = {
    /** Path to custom logo thumbnail */
    customLogoSmall: string | null;
    /** Path to custom logo thumbnail */
    customLogo: string | null;
    /** Path to custom background image */
    loginScreenCustomBackgroundImage: string | null;
};
export type AvailableCountry = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Country name */
    name: string;
    /** Country ISO 3166-1 code */
    code: string;
};
export type ActiveBundle = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Bundle name */
    name: string;
};
export const {
    useAdminSettingsGetQuery,
    useAdminSettingsUpdateMutation,
    useSettingAdminThumbnailQuery,
    useSettingsCountryCollectionQuery,
    useSystemSettingsGetQuery,
    useActiveBundlesGetQuery,
    usePingActionQuery,
} = injectedRtkApi;

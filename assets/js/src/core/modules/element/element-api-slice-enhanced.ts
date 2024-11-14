import {AssetPermissions} from "@Pimcore/modules/asset/asset-api-slice.gen";
import {DataObjectPermissions} from "@Pimcore/modules/data-object/data-object-api-slice.gen";

export type ElementPermissions = AssetPermissions | DataObjectPermissions

import type {VersionIdentifiers} from "@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/versions-view";
import type {Version} from "@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen";

export interface VersionComparisonViewProps {
    versionIds: VersionIdentifiers[]
}

export interface SingleVersionViewProps {
    versions: Version[]
    versionId: VersionIdentifiers
    setDetailedVersions: (vIds: VersionIdentifiers[]) => void
}
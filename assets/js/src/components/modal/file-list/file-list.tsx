import React from "react";
import {useStyle} from "@Pimcore/components/modal/file-list/file-list.styles";

interface IFileListProps {
    files: string[]
}

export const FileList = (props: IFileListProps): React.JSX.Element => {
    const { styles } = useStyle();

    return (
        <ul className={styles.filesList}>
            {props.files.map((file, index) => (
                <li key={index}>{file}</li>
            ))}
        </ul>
    )
}

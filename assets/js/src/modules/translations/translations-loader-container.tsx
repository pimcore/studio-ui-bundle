import React, { useEffect } from "react";
import { useState } from "react";
import {useApiTranslationsPostMutation} from "@Pimcore/modules/asset/translations-api-slice.gen";
import i18n from "@Pimcore/app/i18n";

interface TranslationsLoaderContainerProps {
    children: React.ReactNode
}

export const TranslationsLoaderContainer = (props: TranslationsLoaderContainerProps): React.JSX.Element => {
    const [isLoading, setIsLoading] = useState(true);
    const [translations] = useApiTranslationsPostMutation();

    useEffect(() => {
        translations({ translationJsonld: { locale: 'en' } })
            .unwrap()
            .then(response => {
                i18n.addResourceBundle('en', 'translation', response.keys ?? [], true, true);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('rejected', error);
            });
    }, []);

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {props.children}
        </>
    )
}

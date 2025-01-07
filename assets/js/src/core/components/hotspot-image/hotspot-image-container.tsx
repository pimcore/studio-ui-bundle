import React, { useState } from 'react';
import { HotspotImage, IHotspot, IStyleOptions, defaultStyleOptions } from "@Pimcore/components/hotspot-image/hotspot-image";

interface IHotspotImageContainer {
    src: string;
    styleOptions?: IStyleOptions;
    items?: IHotspot[];
}

export const HotspotImageContainer = ({ src, items, styleOptions = defaultStyleOptions }: IHotspotImageContainer): JSX.Element => {
    const [hotspots, setHotspots] = useState<IHotspot[]>(items ?? []);

    const addHotspot = (type: string): void => {
        const style = styleOptions[type];
        const newHotspot: IHotspot = {
            id: hotspots.length + 1,
            x: 50,
            y: 50,
            width: style.width,
            height: style.height,
            type
        };

        setHotspots([...hotspots, newHotspot]);
    };

    const onRemove = (id: number): void => {
        setHotspots(hotspots.filter(h => h.id !== id));
    }

    const onEdit = (id: number): void => {
        console.log('Todo show edit view', id);
    }

    const onUpdate = (item: IHotspot): void => {
        setHotspots(hotspots.map(h => h.id === item.id ? item : h));
    }

    return (
        <>
            <HotspotImage
                src={src}
                data={hotspots}
                styleOptions={styleOptions}
                onEdit={onEdit}
                onRemove={onRemove}
                onUpdate={onUpdate} />

            <div>
                {JSON.stringify(hotspots, null, 2)}
            </div>

            <button onClick={() => addHotspot('hotspot')}>Add Hotspot</button>
            <button onClick={() => addHotspot('marker')}>Add Marker</button>
        </>
    );
};
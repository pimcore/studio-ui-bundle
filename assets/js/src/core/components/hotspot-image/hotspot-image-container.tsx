import React, { useState } from 'react';
import { HotspotImage, IHotspot, IStyleOptions, defaultStyleOptions } from "@Pimcore/components/hotspot-image/hotspot-image";

interface IHotspotImageContainer {
    src: string;
    styleOptions?: IStyleOptions;
    items?: IHotspot[];
}

export const HotspotImageContainer = ({ src, items, styleOptions = defaultStyleOptions }: IHotspotImageContainer) => {
    const [hotspots, setHotspots] = useState(items || []);

    const addHotspot = (type:string) => {
        const style = styleOptions[type];
        const newHotspot = {
            id: hotspots.length + 1,
            x: 50,
            y: 50,
            width: style.width,
            height: style.height,
            type
        };

        setHotspots([...hotspots, newHotspot]);
    };

    const onClone = (id: number) => {
        const hotspot = hotspots.find(h => h.id === id);
        const newHotspot = {...hotspot, id: hotspots.length + 1};

        setHotspots([...hotspots, newHotspot]);
    }

    const onRemove = (id: number) => {
        setHotspots(hotspots.filter(h => h.id !== id));
    }

    const onEdit = (id: number) => {
        console.log('Todo show edit view', id);
    }

    const onUpdate = (item: IHotspot) => {
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
                onClone={onClone}
                onUpdate={onUpdate} />

            <div>
                {JSON.stringify(hotspots, null, 2)}
            </div>

            <button onClick={() => addHotspot('hotspot')}>Add Hotspot</button>
            <button onClick={() => addHotspot('marker')}>Add Marker</button>
        </>
    );
};
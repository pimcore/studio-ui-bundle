import React, { useState, useRef } from 'react';
import { useStyle } from './hotspot-image.styles';
import {Icon} from "@Pimcore/components/icon/icon";
import { Popover} from "antd";
import { IconTextButton } from "@Pimcore/components/icon-text-button/icon-text-button";
import { IconButton } from "@Pimcore/components/icon-button/icon-button";

interface IStyleOptions {
    hotspot: {
        width: number;
        height: number;
        resizeBorderSize: number;
        minSize: number;
        icon: any;
    };
    marker: {
        width: number;
        height: number;
        icon: any;
    };
}

const defaultStyleOptions = {
    hotspot: {
        width: 100,
        height: 80,
        resizeBorderSize: 10,
        minSize: 24,
        icon: null
    },
    marker: {
        width: 24,
        height: 24,
        icon: 'markerPin02'
    }
}

interface IHotspot {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
}

interface IHotspotImage {
    src: string;
    styleOptions?: IStyleOptions;
    items?: IHotspot[];
    onRemove?: (id: number) => void;
    onClone?: (id: number) => void;
    onEdit?: (id: number) => void;
}

export const HotspotImage = ({ src, items, styleOptions = defaultStyleOptions, onClone, onRemove, onEdit }: IHotspotImage) => {
    const {styles} = useStyle();

    const [hotspots, setHotspots] = useState(items || []);
    const [selectedId, setSelectedId] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });
    const [popoverOpen, setPopoverOpen] = useState(false);
    const containerRef = useRef(null);

    const handleMouseDown = (e, hotspot) => {
        const rect = e.target.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const nearLeftEdge = mouseX < styleOptions[hotspot.type].resizeBorderSize;
        const nearRightEdge = mouseX > rect.width - styleOptions[hotspot.type].resizeBorderSize;
        const nearTopEdge = mouseY < styleOptions[hotspot.type].resizeBorderSize;
        const nearBottomEdge = mouseY > rect.height - styleOptions[hotspot.type].resizeBorderSize;

        if (hotspot.type === 'hotspot' && (nearLeftEdge || nearRightEdge || nearTopEdge || nearBottomEdge)) {
            let direction = '';
            if (nearTopEdge) direction += 'n';
            if (nearBottomEdge) direction += 's';
            if (nearLeftEdge) direction += 'w';
            if (nearRightEdge) direction += 'e';

            setResizeDirection(direction);
            setResizeStart({ x: e.clientX, y: e.clientY, width: hotspot.width, height: hotspot.height });
        } else {
            setDragging(true);
            setDragStart({ x: mouseX, y: mouseY });
        }

        setPopoverOpen(false)
        setSelectedId(hotspot.id);
        e.stopPropagation();
    };
    const handleMouseMove = (e) => {
        if (selectedId === null) return;
        const containerBounds = containerRef.current.getBoundingClientRect();
        const hotspotIndex = hotspots.findIndex(h => h.id === selectedId);
        const hotspot = hotspots[hotspotIndex];
        const dx = e.clientX - resizeStart.x;
        const dy = e.clientY - resizeStart.y;

        if (dragging) {
            const newX = Math.min(containerBounds.width - hotspot.width, Math.max(0, e.clientX - containerBounds.left - dragStart.x));
            const newY = Math.min(containerBounds.height - hotspot.height, Math.max(0, e.clientY - containerBounds.top - dragStart.y));

            setHotspots(hotspots.map((h, i) => i === hotspotIndex ? { ...h, x: newX, y: newY } : h));
        } else if (resizeDirection) {
            let newWidth = resizeStart.width;
            let newHeight = resizeStart.height;
            let newX = hotspot.x;
            let newY = hotspot.y;

            if (resizeDirection.includes('w')) {
                newWidth = Math.max(styleOptions[hotspot.type].minSize, resizeStart.width - dx);
                newX = Math.min(hotspot.x + resizeStart.width - styleOptions[hotspot.type].minSize, e.clientX - containerBounds.left);

                if (newWidth === styleOptions[hotspot.type].minSize) {
                    newX = hotspot.x + hotspot.width - styleOptions[hotspot.type].minSize;
                }
            }
            if (resizeDirection.includes('e')) {
                newWidth = Math.max(styleOptions[hotspot.type].minSize, resizeStart.width + dx);
            }
            if (resizeDirection.includes('n')) {
                newHeight = Math.max(styleOptions[hotspot.type].minSize, resizeStart.height - dy);
                newY = Math.min(hotspot.y + resizeStart.height - styleOptions[hotspot.type].minSize, e.clientY - containerBounds.top);

                if (newHeight === styleOptions[hotspot.type].minSize) {
                    newY = hotspot.y + hotspot.height - styleOptions[hotspot.type].minSize;
                }
            }
            if (resizeDirection.includes('s')) {
                newHeight = Math.max(styleOptions[hotspot.type].minSize, resizeStart.height + dy);
            }

            // Update the hotspot with the new position and size
            setHotspots(hotspots.map((h, i) => i === hotspotIndex ? {
                ...h,
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight
            } : h));
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        setResizeDirection(null);
    };

    const addHotspot = (type:string) => {
        const style = styleOptions[type];
        const newHotspot = {
            id: hotspots.length,
            x: 50,
            y: 50,
            width: style.width,
            height: style.height,
            type
        };
        setHotspots([...hotspots, newHotspot]);
    };

    return (
        <>
            <div
                ref={containerRef}
                className={['hotspot-image', styles.hotspotImage].join(' ')}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <img src={src} alt="Decorative" className={'hotspot-image__image'} />
                {hotspots.map(hotspot => (
                    <Popover
                        trigger={['contextMenu']}
                        key={hotspot.id}
                        arrow={false}
                        size={'small'}
                        open={popoverOpen && selectedId === hotspot.id}
                        onOpenChange={(open) => setPopoverOpen(open)}
                        content={
                            <div>
                                {onEdit !== undefined ? (
                                    <IconTextButton icon={ { value: 'PlusOutlined' } } type="default" onClick={() => onEdit(hotspot.id)}>Add & Edit Data</IconTextButton>
                                ) : null}

                                {onClone !== undefined ? (
                                    <IconButton icon={ { value: 'copy-03' } } type={"link"} onClick={() => onClone(hotspot.id)} />
                                ): null}

                                {onRemove !== undefined ? (
                                    <IconButton icon={ { value: 'trash' } } type={"link"} onClick={() => onRemove(hotspot.id)} />
                                ): null}
                            </div>
                        }
                    >
                        <div
                            key={hotspot.id}
                            className={`hotspot-image__item ${hotspot.type === 'marker' ? 'hotspot-image__item--marker' : ''}`}
                            style={{
                                position: 'absolute',
                                left: `${hotspot.x}px`,
                                top: `${hotspot.y}px`,
                                width: `${hotspot.width}px`,
                                height: `${hotspot.height}px`
                            }}
                            onMouseDown={evt => handleMouseDown(evt, hotspot)}>

                            {styleOptions[hotspot.type]?.icon ? (
                                <Icon value={styleOptions[hotspot.type].icon}/>
                            ) : null}
                        </div>
                    </Popover>
                ))}
            </div>

            <button onClick={() => addHotspot('hotspot')}>Add Hotspot</button>
            <button onClick={() => addHotspot('marker')}>Add Marker</button>
        </>
    );
};
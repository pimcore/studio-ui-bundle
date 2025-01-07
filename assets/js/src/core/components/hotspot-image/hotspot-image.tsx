import React, {useState, useRef, useEffect, MouseEvent} from 'react';
import { useStyle } from './hotspot-image.styles';
import { Icon } from "@Pimcore/components/icon/icon";
import { Popover } from "antd";
import { IconTextButton } from "@Pimcore/components/icon-text-button/icon-text-button";
import { IconButton } from "@Pimcore/components/icon-button/icon-button";

export interface IStyleOptions {
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

export const defaultStyleOptions = {
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

export interface IHotspot {
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
    data?: IHotspot[];
    onRemove: (id: number) => void;
    onEdit?: (id: number) => void;
    onUpdate: (item: IHotspot) => void;
}

export const HotspotImage = ({ src, data, styleOptions = defaultStyleOptions, onRemove, onEdit, onUpdate }: IHotspotImage): JSX.Element => {
    const { styles } = useStyle();

    const [items, setItems] = useState<IHotspot[]>(data ?? []);
    useEffect((): void => {
        setItems(data ?? []);
    }, [data?.length]);

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [resizeDirection, setResizeDirection] = useState<string | null>(null);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const dragItem = (evt: MouseEvent, containerBounds: DOMRect, hotspotIndex: number, hotspot: IHotspot): void => {
        const newX = Math.min(containerBounds.width - hotspot.width, Math.max(0, evt.clientX - containerBounds.left - dragStart.x));
        const newY = Math.min(containerBounds.height - hotspot.height, Math.max(0, evt.clientY - containerBounds.top - dragStart.y));

        setItems(items.map((h, i) => i === hotspotIndex ? { ...h, x: newX, y: newY } : h));
    };

    const resizeItem = (evt: MouseEvent, containerBounds: DOMRect, hotspotIndex: number, hotspot: IHotspot, dx: number, dy: number): void => {
        let newWidth = resizeStart.width,
            newHeight = resizeStart.height,
            newX = hotspot.x,
            newY = hotspot.y;

        if (resizeDirection?.includes('w')) {
            ({ newWidth, newX } = handleWestResize(hotspot, dx, evt, containerBounds));
        }
        if (resizeDirection?.includes('e')) {
            newWidth = Math.min(containerBounds.width - hotspot.x, Math.max(styleOptions[hotspot.type].minSize, resizeStart.width + dx));
        }
        if (resizeDirection?.includes('n')) {
            ({ newHeight, newY } = handleNorthResize(hotspot, dy, evt, containerBounds));
        }
        if (resizeDirection?.includes('s')) {
            newHeight = Math.max(styleOptions[hotspot.type].minSize, resizeStart.height + dy);
        }

        setItems(items.map((h, i) => i === hotspotIndex ? {
            ...h,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
        } : h));
    };

    const handleWestResize = (hotspot: IHotspot, dx: number, evt: MouseEvent, containerBounds: DOMRect): { newWidth: number, newX: number } => {
        let newWidth = Math.max(styleOptions[hotspot.type].minSize, resizeStart.width - dx);
        let newX = Math.min(hotspot.x + resizeStart.width - styleOptions[hotspot.type].minSize, evt.clientX - containerBounds.left);

        if (newWidth === styleOptions[hotspot.type].minSize) {
            newX = hotspot.x + hotspot.width - styleOptions[hotspot.type].minSize;
        }

        return { newWidth, newX };
    };

    const handleNorthResize = (hotspot: IHotspot, dy: number, evt: MouseEvent, containerBounds: DOMRect): { newHeight: number, newY: number } => {
        let newHeight = Math.max(styleOptions[hotspot.type].minSize, resizeStart.height - dy);
        let newY = Math.min(hotspot.y + resizeStart.height - styleOptions[hotspot.type].minSize, evt.clientY - containerBounds.top);

        if (newHeight === styleOptions[hotspot.type].minSize) {
            newY = hotspot.y + hotspot.height - styleOptions[hotspot.type].minSize;
        }

        return { newHeight, newY };
    };

    const handleMouseDown = (evt: MouseEvent, hotspot: IHotspot): void => {
        const rect = evt.currentTarget.getBoundingClientRect();
        const mouseX = evt.clientX - rect.left;
        const mouseY = evt.clientY - rect.top;

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
            setResizeStart({ x: evt.clientX, y: evt.clientY, width: hotspot.width, height: hotspot.height });
        } else {
            setDragging(true);
            setDragStart({ x: mouseX, y: mouseY });
        }

        setPopoverOpen(false);
        setSelectedId(hotspot.id);
        evt.stopPropagation();
    };

    const handleMouseMove = (evt: MouseEvent): void => {
        if (selectedId === null || containerRef.current === null) return;
        const containerBounds = containerRef.current.getBoundingClientRect();
        const hotspotIndex = items.findIndex(h => h.id === selectedId);
        const dx = evt.clientX - resizeStart.x;
        const dy = evt.clientY - resizeStart.y;

        if (dragging) {
            dragItem(evt, containerBounds, hotspotIndex, items[hotspotIndex]);
        } else if (resizeDirection) {
            resizeItem(evt, containerBounds, hotspotIndex, items[hotspotIndex], dx, dy);
        }
    };

    const handleMouseUp = (): void => {
        setDragging(false);
        setResizeDirection(null);

        const updatedItem = items.find(h => h.id === selectedId);
        if (updatedItem) {
            onUpdate(updatedItem);
        }
    };

    return (
        <div
            ref={containerRef}
            className={['hotspot-image', styles.hotspotImage].join(' ')}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            role="none"
        >
            <img src={src} className={'hotspot-image__image'} alt="" />
            {items.map(hotspot => (
                <Popover
                    overlayClassName={[styles.Popover].join(' ')}
                    trigger={['contextMenu']}
                    key={hotspot.id}
                    arrow={false}
                    open={popoverOpen && selectedId === hotspot.id}
                    onOpenChange={(open) => setPopoverOpen(open)}
                    content={
                        <>
                            {onEdit !== undefined ? (
                                <IconTextButton icon={{ value: 'PlusOutlined' }} type="default" onClick={() => onEdit(hotspot.id)}>Add & Edit Data</IconTextButton>
                            ) : null}

                            <IconButton icon={{ value: 'open-folder' }} type={"link"} onClick={() => console.log('TODO')} />

                            <IconButton icon={{ value: 'trash-04' }} type={"link"} onClick={() => onRemove(hotspot.id)} />

                            <IconButton icon={{ value: 'dots-horizontal' }} type={"link"} />
                        </>
                    }
                >
                    <button
                        type={'button'}
                        key={hotspot.id}
                        className={`hotspot-image__item ${hotspot.type === 'marker' ? 'hotspot-image__item--marker' : ''}`}
                        style={{
                            position: 'absolute',
                            left: `${hotspot.x}px`,
                            top: `${hotspot.y}px`,
                            width: `${hotspot.width}px`,
                            height: `${hotspot.height}px`
                        }}
                        onMouseDown={evt => handleMouseDown(evt, hotspot)}
                    >
                        {styleOptions[hotspot.type]?.icon ? (
                            <Icon value={styleOptions[hotspot.type].icon} />
                        ) : null}
                    </button>
                </Popover>
            ))}
        </div>
    );
};
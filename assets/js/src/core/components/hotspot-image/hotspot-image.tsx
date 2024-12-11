import React, { useState, useEffect, useRef } from 'react';
import { useStyle } from './hotspot-image.styles';
import {Dropdown, MenuProps} from "antd";

interface IHotspotImage {
    src: string;
}
const styleOptions = {
    hotspot: {
        width: 80,
        height: 40,
        handleRadius: 5,
        minSize: 10,
        fillStyle: 'rgba(215, 199, 236, 0.60)',
        strokeStyle: '#722ED1',
        stroke: '2'
    },
    marker: {
        width: 24,
        height: 24,
        handleRadius: 5,
        fillStyle: 'rgba(215, 199, 236, 0.60)',
        strokeStyle: '#722ED1',
        stroke: '2'
    }
}

export const HotspotImage = ({ src }: IHotspotImage): React.JSX.Element => {
    const { styles } = useStyle()
    const [rectangles, setRectangles] = useState([]);

    const [clickOutsideRect, setClickOutsideRect] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [selectedRectId, setSelectedRectId] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(null);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const drawHandles = (ctx, rect) => {
        const points = [
            { x: rect.left, y: rect.top, cursor: 'nw-resize' }, // Top-left
            { x: rect.left + rect.width, y: rect.top, cursor: 'ne-resize' }, // Top-right
            { x: rect.left + rect.width, y: rect.top + rect.height, cursor: 'se-resize' }, // Bottom-right
            { x: rect.left, y: rect.top + rect.height, cursor: 'sw-resize' } // Bottom-left
        ];
        ctx.fillStyle = styleOptions[rect.type].strokeStyle;
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, styleOptions[rect.type].handleRadius, 0, 2 * Math.PI);
            ctx.fill();
        });
    };

    const drawRoundedRect = (ctx, x, y, width, height, radius, lineWidth) => {
        x += lineWidth / 2;
        y += lineWidth / 2;
        width -= lineWidth;
        height -= lineWidth;

        ctx.beginPath();
        ctx.setLineDash([6, 6]);
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
    };

    const drawRectInCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        rectangles.forEach(rect => {
            const rectStyle = styleOptions[rect.type];
            ctx.lineWidth = rectStyle.stroke;
            ctx.fillStyle = rectStyle.fillStyle;
            ctx.strokeStyle = rectStyle.strokeStyle;
            drawRoundedRect(ctx, rect.left, rect.top, rect.width, rect.height, 4, ctx.lineWidth);
            ctx.fill();
            ctx.stroke();

            if (rect.type === 'hotspot' && rect.id === selectedRectId) {
                drawHandles(ctx, rect);
            }
        });
    };

    useEffect(() => {
        const image = imageRef.current;
        const canvas = canvasRef.current;

        canvas.style.position = 'absolute';
        canvas.width = image.clientWidth;
        canvas.height = image.clientHeight;
        canvas.style.left = image.offsetLeft + 'px';
        canvas.style.top = image.offsetTop + 'px';

        drawRectInCanvas();
    }, [rectangles, selectedRectId]);// Redraw when rectangles list or selected rectangle changes

    const getMousePos = (canvas, evt) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    };

    const checkForResizeHandle = (rect, clickX, clickY) => {
        if (rect.type !== 'hotspot') return -1;
        // Define handle regions with a slightly bigger area for easier grabbing
        const handleDetectionRadius = styleOptions[rect.type].handleRadius + 5; // Increase this to make it easier to grab handles
        const handlePositions = [
            { x: rect.left, y: rect.top },  // Top-left corner
            { x: rect.left + rect.width, y: rect.top },  // Top-right corner
            { x: rect.left + rect.width, y: rect.top + rect.height },  // Bottom-right corner
            { x: rect.left, y: rect.top + rect.height }  // Bottom-left corner
        ];

        for (let i = 0; i < handlePositions.length; i++) {
            const handle = handlePositions[i];
            const distance = Math.sqrt(
                (clickX - handle.x) ** 2 +
                (clickY - handle.y) ** 2
            );
            if (distance < handleDetectionRadius) {
                return i;  // Return the index of the handle that was clicked
            }
        }
        return -1;  // Return -1 if no handle was clicked
    };
    const handleMouseDown = (e) => {
        const pos = getMousePos(canvasRef.current, e);
        setStartPos(pos);

        setClickOutsideRect(true);

        const clickedRect = rectangles.find(rect =>
            pos.x >= rect.left - styleOptions[rect.type].handleRadius && pos.x <= rect.left + rect.width + styleOptions[rect.type].handleRadius &&
            pos.y >= rect.top - styleOptions[rect.type].handleRadius && pos.y <= rect.top + rect.height + styleOptions[rect.type].handleRadius
        );

        if (clickedRect) {
            setClickOutsideRect(false);

            setSelectedRectId(clickedRect.id);
            const handleIndex = checkForResizeHandle(clickedRect, pos.x, pos.y);

            if (handleIndex !== -1) {
                setIsResizing(handleIndex);
            } else {
                setIsDragging(true);
                // canvasRef.current.style.cursor = 'move'; // Set cursor to move
            }
        }
    };
    const handleMouseMove = (e) => {
        if (!isDragging && isResizing === null) return;

        const pos = getMousePos(canvasRef.current, e);
        const dx = pos.x - startPos.x;
        const dy = pos.y - startPos.y;

        setRectangles((prevRectangles) =>
            prevRectangles.map((rect) => {
                if (rect.id === selectedRectId) {
                    setContextMenuOpen(false);

                    if (isDragging) {
                        // Calculate new position ensuring the rectangle stays within bounds
                        const newLeft = Math.min(Math.max(0, rect.left + dx), canvasRef.current.width - rect.width);
                        const newTop = Math.min(Math.max(0, rect.top + dy), canvasRef.current.height - rect.height);
                        return { ...rect, left: newLeft, top: newTop };
                    } else if (typeof isResizing === 'number') {
                        // Implement resizing logic here based on which handle is being resized
                        // This is a placeholder for the resizing logic
                        let newLeft = rect.left;
                        let newTop = rect.top;
                        let newWidth = rect.width;
                        let newHeight = rect.height;

                        switch (isResizing) {
                            case 0: // Top-left handle
                                newLeft = rect.left + dx;
                                newTop = rect.top + dy;
                                newWidth = rect.width - dx;
                                newHeight = rect.height - dy;
                                break;
                            case 1: // Top-right handle
                                newTop = rect.top + dy;
                                newWidth = rect.width + dx;
                                newHeight = rect.height - dy;
                                break;
                            case 2: // Bottom-right handle
                                newWidth = rect.width + dx;
                                newHeight = rect.height + dy;
                                break;
                            case 3: // Bottom-left handle
                                newLeft = rect.left + dx;
                                newWidth = rect.width - dx;
                                newHeight = rect.height + dy;
                                break;
                            default:
                                break;
                        }

                        // Constrain new dimensions to minimum size and canvas bounds
                        newWidth = Math.max(newWidth, styleOptions[rect.type].minSize);
                        newHeight = Math.max(newHeight, styleOptions[rect.type].minSize);

                        // Constrain new position to canvas bounds
                        newLeft = Math.min(newLeft, rect.left + rect.width - styleOptions[rect.type].minSize);
                        newTop = Math.min(newTop, rect.top + rect.height - styleOptions[rect.type].minSize);

                        return {
                            ...rect,
                            left: newLeft,
                            top: newTop,
                            width: newWidth,
                            height: newHeight
                        };
                    }
                }
                return rect;
            })
        );

        setStartPos(pos);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(null);
        // canvasRef.current.style.cursor = 'default'; // Reset cursor to default
    };

    const addRectangle = (type:string) => {
        let rectStyle = styleOptions[type];
        const newRect = {
            id: Date.now(),
            left: Math.max(10, Math.random() * (canvasRef.current.width - rectStyle.width)),
            top: Math.max(10, Math.random() * (canvasRef.current.height - rectStyle.height)),
            width: rectStyle.width,
            height: rectStyle.height,
            type: type
        };
        setRectangles([...rectangles, newRect]);
        setSelectedRectId(newRect.id);
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Edit',
            onClick: () => console.log(`Edit ${selectedRectId}`)
        },
        {
            key: '2',
            label: 'Delete',
            onClick: () => setRectangles(rectangles.filter(rect => rect.id !== selectedRectId))
        }
    ]

    return (
        <>
            <div className={['hotspot-image', styles.hotspotImage].join(' ')}>
                <img ref={imageRef} src={src} alt="Full" id="hotspot-image__image"/>
                <Dropdown
                    menu={{items}}
                    disabled={clickOutsideRect && !contextMenuOpen}
                    trigger={['contextMenu']}
                    open={contextMenuOpen}
                    onOpenChange={(open) => setContextMenuOpen(open)}
                >
                    <canvas ref={canvasRef} className={'hotspot-image__canvas'}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onTouchStart={handleMouseDown} // Add touch event listeners
                            onTouchMove={handleMouseMove}
                            onTouchEnd={handleMouseUp}
                    />
                </Dropdown>
            </div>

            <button onClick={() => addRectangle('hotspot')}>Add Hotspot</button>
            <button onClick={() => addRectangle('marker')}>Add Marker</button>
        </>
    );
};
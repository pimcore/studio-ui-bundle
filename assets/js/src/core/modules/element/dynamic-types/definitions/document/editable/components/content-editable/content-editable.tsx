import React, { useRef } from 'react';
import { useStyle } from './content-editable.styles';
import { isUndefined } from 'lodash';

export interface ContentEditableProps {
    // Define props similar to others in the project
    value?: string | null;
    onChange?: (newValue: string | null) => void;
    className?: string;
    placeholder?: string;
    required?: boolean;
    width?: number;
    nowrap?: boolean;
}

const pasteHtmlAtCaret = function (html: string): void {
    let sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel?.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            const el = document.createElement("div");
            el.innerHTML = html;
            const frag = document.createDocumentFragment();
            let node, lastNode;

            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }

            const firstNode = frag.firstChild;
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }
};

const ContentEditable = ({ value, onChange, className, placeholder, required, width, nowrap }: ContentEditableProps): JSX.Element => {
    const contentRef = useRef<HTMLDivElement>(null);

    const { styles } = useStyle();

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();

        let text = '';
        if (e.clipboardData) {
            text = e.clipboardData.getData('text/plain');
        } else if (!isUndefined(window['clipboardData'])) {
            text = (window['clipboardData'] as any).getData('Text');
        }

        text = text.replace(/\r\n|\n/g, ' ').trim();

        pasteHtmlAtCaret(text);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleKeyUp = () => {
        const textContent = contentRef.current?.textContent?.trim() || '';
        if (required && textContent.length < 1) {
            contentRef.current?.classList.add('empty');
        } else {
            contentRef.current?.classList.remove('empty');
        }
        onChange?.(textContent);
    };

    return (
        <div
            ref={contentRef}
            className={`${className} ${styles.contentEditable}`}
            contentEditable="true"
            data-placeholder={placeholder}
            style={{
                display: width ? 'inline-block' : undefined,
                width: width ? `${width}px` : undefined,
                overflow: nowrap || width ? 'auto' : undefined,
                whiteSpace: nowrap ? 'nowrap' : undefined,
            }}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            dangerouslySetInnerHTML={{ __html: (value ?? '') + '<br>' }}
        />
    );
};

export default ContentEditable;

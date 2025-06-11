import { createStyles } from 'antd-style';

export const useStyle = createStyles(({ css }) => {
    return {
        contentEditable: css`
            outline: 0 auto;
            overflow-y: visible;

            &.empty {
                outline: 1px dashed #BABABA;
            }
            
            &:hover {
                outline: 2px dashed #BABABA;
                outline-offset: 5px;
            }

            &:focus {
                outline: 0 auto;
                overflow-y: visible;
            }
        `,
    };
});

import type React from "react";

export interface ITab {
    key: string
    label: string
    children: React.JSX.Element
    icon: React.JSX.Element
}

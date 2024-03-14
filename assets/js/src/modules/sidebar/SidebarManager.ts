import React from "react";

interface ISidebarEntry {
    key: string;
    icon: React.JSX.Element;
    component: React.JSX.Element;
}

export abstract class SidebarManager {
    entries: ISidebarEntry[] = []

    getEntries(): ISidebarEntry[] {
        return this.entries;
    }

    getEntry(key: string): ISidebarEntry| undefined {
        return this.entries.find((entry) => entry.key === key);
    }

    registerEntry(entry: ISidebarEntry): void {
        if (this.getEntry(entry.key) !== undefined) {
            this.entries.splice(this.entries.findIndex((e) => e.key === entry.key), 1, entry);
            return;
        }

        this.entries.push(entry);
    }
}

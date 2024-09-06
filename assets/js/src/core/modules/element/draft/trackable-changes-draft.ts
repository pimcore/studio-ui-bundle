export interface TrackableChangesDraft {
    modified: boolean
    changes: Record<string, boolean>
}
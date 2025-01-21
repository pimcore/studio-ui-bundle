export interface AdvancedManyToManyRelationValueItem {
    element: {
        id: number
        type: string
        subtype: string | null
        fullPath: string
        isPublished: boolean | null
    }
    fieldName: string
    columns: string[] | null
    data: Record<string, any> | null
}

export type AdvancedManyToManyRelationValue = AdvancedManyToManyRelationValueItem[]
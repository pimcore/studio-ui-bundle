export type GeoPoint = {
    lat: number
    lng: number
}

export type GeoPolyLine = GeoPoint[]

export type GeoType = GeoPoint | GeoPolyLine
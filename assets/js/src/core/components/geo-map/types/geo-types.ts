export type GeoPoint = {
    latitude: number
    longitude: number
}

export type GeoPoints = GeoPoint[]

export type GeoBounds = {
    NElongitude: number,
    NElatitude: number,
    SWlongitude: number,
    SWlatitude: number
}

export type GeoType = GeoPoint | GeoPoints | GeoBounds
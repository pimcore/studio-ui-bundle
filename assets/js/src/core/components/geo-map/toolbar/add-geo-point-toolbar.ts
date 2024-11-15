import L from 'leaflet';

export type GeoPoint = {
    lat: number,
    lng: number
}

export const addGeoPointToolbar = (leafletMap: L.Map, featureGroup: L.FeatureGroup, geoPoint?: GeoPoint, onChange?: (geoPoint: GeoPoint) => void) => {
    leafletMap.addLayer(featureGroup);

    const marker = geoPoint !== undefined ? L.marker([geoPoint.lat, geoPoint.lng], { draggable: true }) : undefined;
    if (marker !== undefined) {
        featureGroup.addLayer(marker);
    }

    async function reverseGeocode(layerObj: L.Marker): Promise<void> {

        const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lng}`
            .replace("{lat}", layerObj.getLatLng().lat.toString())
            .replace("{lng}", layerObj.getLatLng().lng.toString());


        const response = await fetch(reverseGeocodeUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch reverse geocoding data: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.display_name) {
            const locationText = data.display_name;
            layerObj.bindTooltip(locationText);
            layerObj.openTooltip();
        }
    }

    const drawControlFull = new L.Control.Draw({
        position: 'topright',
        draw: {
            polyline: false,
            polygon: false,
            circle: false,
            rectangle: false,
            circlemarker: false
        },
        edit: {
            featureGroup: featureGroup,
            remove: false
        }
    });
    leafletMap.addControl(drawControlFull);

    leafletMap.on(L.Draw.Event.CREATED, async function (e) {

        featureGroup.clearLayers();
        if (marker !== undefined) {
            marker.remove();
        }

        const layer = e.layer;
        featureGroup.addLayer(layer);

        if (featureGroup.getLayers().length === 1) {
            await reverseGeocode(layer);
            onChange?.(layer.getLatLng());
        }

    }.bind(this));


    leafletMap.on("draw:editmove", async function (e) {
        await reverseGeocode(e.layer);
        onChange?.(e.layer.getLatLng());
    }.bind(this));

    // cancel marker move
    let editsWereSaved = false;
    leafletMap.on('draw:edited', () => {
        editsWereSaved = true;
    });

    leafletMap.on("draw:editstop", async function (e) {
        if (editsWereSaved) {
            editsWereSaved = false;
            return;
        }
        const editedLayers = (e as any).target._layers;

        for (const layerId in editedLayers) {
            const layer = editedLayers[layerId];

            if (layer instanceof L.Marker) {
                onChange?.(layer.getLatLng())
            }
        }
        editsWereSaved = false;
    }.bind(this));
}
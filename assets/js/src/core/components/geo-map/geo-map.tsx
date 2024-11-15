/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import {addGeoPointToolbar, GeoPoint} from "@Pimcore/components/geo-map/toolbar/add-geo-point-toolbar";
import cn from "classnames";
import { useStyles } from './geo-map.styles'

interface GeoMapProps {
  onChange?: (value: GeoPoint) => void
  mode?: 'geoPoint' | 'geoLine' | 'geoPolygon'
  value?: GeoPoint
}

export const GeoMap = (props: GeoMapProps): React.JSX.Element => {

  const { styles } = useStyles()
  const mapContainer = useRef<HTMLDivElement>(null); // Reference to the map container

  useEffect(() => {
    // Initialize the map
    const map = L.map(mapContainer.current as HTMLElement).setView([51.505, -0.09], 13); // Coordinates and zoom level

    // Add a Tile Layer
    L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const featureGroup = L.featureGroup().addTo(map);

    if (props.mode === 'geoPoint') {
      addGeoPointToolbar(map, featureGroup, props.value, props.onChange);
    }

    // Clean up on component unmount
    return () => {
      map.remove();
    };
  }, [mapContainer, props.mode, props.value]);

  return <div ref={mapContainer} className={ cn(styles.mapContainer)} style={{ height: '500px', width: '800px' }} />;
}

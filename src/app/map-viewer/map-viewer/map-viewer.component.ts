import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';
import Map from "ol/Map";
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Vector as vectorLayer } from 'ol/layer';
import { Vector as vectorSource }  from 'ol/source';
import Overlay from 'ol/Overlay';
import { Point } from 'ol/geom';
import { defaults } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import FullScreen from 'ol/control/FullScreen';
import ZoomSlider from 'ol/control/ZoomSlider';
import Feature from 'ol/Feature';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { geoLocationResult } from 'src/app/shared/models';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements OnInit, AfterViewInit, AfterContentChecked {

  map: Map = new Map({});
  popup: Overlay = new Overlay({});
  locationPoint: vectorSource = new vectorSource({});
  popupCoordinatesElement: any;
  
  constructor(private geolocationServicex: GeolocationService, private _snackbar: MatSnackBar) {}

  ngOnInit() {

    this.popupCoordinatesElement = document.getElementById("popup-coordinates");

  }

  ngAfterContentChecked() {
  }

  ngAfterViewInit() {

    // map controls
    const fullscreenControl = new FullScreen();
    const ZoomSliderControl = new ZoomSlider();

    this.map = new Map({
      
      view : new View({
        center : [53.59038568707326, 33.00979960260193],
        zoom : 6,
        projection: 'EPSG:4326',
      }),

      layers : [
        new TileLayer ({
          source: new OSM(),
        })
      ],

      target : 'map',
      controls : defaults().extend([
        fullscreenControl,
        ZoomSliderControl
      ])

    });

  }

  locateMe(event:any) {

    const result: geoLocationResult = this.geolocationServicex.getLocation();

    if ( result.status === 200 && !result.Latitude && !result.Longitude ) {

      this._snackbar.open("Please waite and try again ...", '', {
        duration: 2000
      });

    }
    else {

      const point = new Point([result.Longitude, result.Latitude]);

      const iconFeature = new Feature({
        geometry: point,
      });

      const locationPoint = new vectorSource({
        features: [
          iconFeature
        ]
      });  

      const newLayer = new vectorLayer ({
        source: locationPoint
      });

      this.map.addLayer(newLayer);

      this.map.getView().fit(locationPoint.getExtent(), {

        maxZoom: 18

      });

    }

  }

}

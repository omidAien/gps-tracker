import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapViewerRoutingModule } from './map-viewer-routing.module';
import { MapViewerComponent } from './map-viewer/map-viewer.component';


@NgModule({
  declarations: [MapViewerComponent],
  imports: [
    CommonModule,
    MapViewerRoutingModule
  ]
})
export class MapViewerModule { }

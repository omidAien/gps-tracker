import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { geoLocationResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private Latitude: number = 0.00;
  private Longitude: number = 0.00;
  private Message: string = "Successfull";
  private Status: number = 200;
  private Options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };


  constructor() { }

  getLocation() {

    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
        
          this.Latitude = position.coords.latitude;
          this.Longitude = position.coords.longitude;

        }, 
        (error) => {

          this.Message = "The Coordinate has not been recognized!";
          this.Status = 400;

        },
        this.Options
      );
      
    } 
    else {

      const errorMessage:string = "Geolocation is not supported by this browser.";
      this.Message = errorMessage;
      this.Status = 500;

    }

    return this.getResult();

  }

  private getResult() {

    const result: geoLocationResult = {
      Latitude: this.Latitude,
      Longitude: this.Longitude,
      message: this.Message,
      status: this.Status
    };

    return result;

  }

}

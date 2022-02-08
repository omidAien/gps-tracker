import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GPSTracker';

  _horizontalPosition: MatSnackBarHorizontalPosition = "center";
  _verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(private snackBar: MatSnackBar) {
    
  }

  ngOnInit(): void {
      
    

  }

  getLocation() {

    if (navigator.geolocation) {
      
      try {

        navigator.geolocation.getCurrentPosition((position) => {

          const res = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    
          this.snackBar.open(res, '', {
            duration: 5000,
            horizontalPosition: this._horizontalPosition,
            verticalPosition: this._verticalPosition,
          });

        }, 
        (error) => {

          this.snackBar.open("Please Use GPS-DEVICE!", '', {
            duration: 5000,
            horizontalPosition: this._horizontalPosition,
            verticalPosition: this._verticalPosition,
          });

        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000
        });

      } catch (error) {
        
        this.snackBar.open("error", '', {
          duration: 5000,
          horizontalPosition: this._horizontalPosition,
          verticalPosition: this._verticalPosition,
        });

      }
      
    } 
    else {
      const errorMessage:string = "Geolocation is not supported by this browser.";
      
      this.snackBar.open(errorMessage, '', {
        duration: 5000,
        horizontalPosition: this._horizontalPosition,
        verticalPosition: this._verticalPosition,
      });

    }
  }
  

}

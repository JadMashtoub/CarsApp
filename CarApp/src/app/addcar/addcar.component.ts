import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-addcar',
  standalone: true,
  imports: [HttpClientModule,CommonModule, FormsModule, RouterModule],
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.scss'],
})

export class AddcarComponent {
  car = {
    name: '',
    model: '',
    hasPlates: 'true',
    hasBooks:'true',
    plateNo: '',
    keyNo: '',
    location: '',
    vin: '',
    colour: '',
    damage: '',
  };
  locations: any[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit(): void {
    this.getLocations();
  }
  getLocations(): void {
    // DEPLOY
    // this.http.get('http://localhost:3000/locations').subscribe({ 
      this.http.get('https://carslist.azurewebsites.net/locations').subscribe({

      next:(response: any) => (this.locations = response),
      error: (err)=>console.error('Error fetching locations: ', err)
    });
  }
  // goToAddLocation(): void {
  //   this.router.navigate(['/location']);
  // }
  onSubmit(): void {
    const payload ={
      ...this.car,
      hasPlates: !!this.car.hasPlates,

    };
    this.http.post('https://carslist.azurewebsites.net/cars', this.car, { responseType: 'text' })
    // this.http.post('http://localhost:3000/cars', this.car, { responseType: 'text' })

      .subscribe({
        next: (data) => {
          alert('Car added sucessfully!')
          console.log('Car added successfully!', data);
          // this.router.navigate(['/viewcar']); // Navigate to the home page after adding the car
        },
        error: (err) => {
          console.error('Error adding car:', err);
          // this.router.navigate(['/viewcar']); // Navigate to the home page after adding the car

        },
      });
  }
}
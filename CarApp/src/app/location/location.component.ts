import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  locationName = '';
  constructor(private http: HttpClient, private router: Router) {}

  addLocation(): void {
    // this.http.post('http://localhost:3000/locations', { name: this.locationName }).subscribe({
    this.http.post('https://carslist.azurewebsites.net/locations', { name: this.locationName }).subscribe({

        next: (response: any) => {
            if (response.status === 201) {
                alert('Location added successfully!');
            } else {
                console.error('Unexpected response:', response);
            }
            this.router.navigate(['/addcar']);
        },
        error: (err) => {
            if (err.status === 201) {
                alert('Location added successfully!');
                this.router.navigate(['/addcar']);
            } else {
                console.error('Error adding location: ', err);
            }
        }
    });
  }
}

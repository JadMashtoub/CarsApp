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
  locations: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.getLocations(); 
  }
  getLocations(): void {
    // this.http.get<any[]>('http://localhost:3000/locations').subscribe({
      this.http.get<any[]>('https://carslist.azurewebsites.net/locations').subscribe({

      next: (data) => (this.locations = data),
      error: (err) => console.error('Error loading locations:', err)
    });
  }
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
  deleteTarget: string = '';

  deleteLocation(name: string): void {
    if (!name.trim()) {
      alert('Please enter a location name.');
      return;
    }
  
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
    //   this.http.delete(`http://localhost:3000/locations/${name}`).subscribe({
        this.http.delete(`https://carslist.azurewebsites.net/locations/${name}`).subscribe({

        next: (response: any) => {
          alert(response.message);
          this.deleteTarget = '';
          this.getLocations();
        },
        error: (err) => {
          console.error('Error deleting location:', err);
          alert('Failed to delete location.');
        }
      });
    }
  }
}
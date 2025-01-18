import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addcar',
  standalone: true,
  imports: [HttpClientModule,CommonModule, FormsModule],
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.scss'],
})
export class AddcarComponent {
  car = {
    name: '',
    model: '',
    hasPlates: 'true',
    plateNo: '',
    keyNo: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.http.post('http://localhost:3000/cars', this.car, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          alert('Car added sucessfully!')
          console.log('Car added successfully!', data);
          // this.router.navigate(['/']); // Navigate to the home page after adding the car
        },
        error: (err) => {
          console.error('Error adding car:', err);
        },
      });
  }
}
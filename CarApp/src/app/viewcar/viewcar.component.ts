import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewcar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './viewcar.component.html',
  styleUrls: ['./viewcar.component.scss'],
})
export class ViewcarComponent {
  cars: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.http.get<any[]>('http://localhost:3000/cars') 
      .subscribe({
        next: (data) => {
          this.cars = data;
        },
        error: (err) => {
          console.error('Error fetching cars:', err);
        },
      });
  }
}
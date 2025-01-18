import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-viewcar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], 
  templateUrl: './viewcar.component.html',
  styleUrls: ['./viewcar.component.scss'],
})
export class ViewcarComponent implements OnInit {
  cars: any[] = [];
  filteredCars: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCars();
  }

getCars(): void {
  this.http.get<any[]>('http://localhost:3000/cars')
    .subscribe({
      next: (data) => {
        console.log('Fetched Cars:', data);  // Log table
        this.cars = data;
        this.filteredCars = data; 
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      },
    });
}
  filterCars(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCars = this.cars.filter((car) => {
      // console.log(car.name, car.plateNo);
      return car.name.toLowerCase().includes(term) ||
             car.plateNo.toLowerCase().includes(term);
    });
  }



  // filterCars(): void {
  //   const term = this.searchTerm.toLowerCase();
  //   this.filteredCars = this.cars.filter(
  //     (car) => car.name.toLowerCase().includes(term)
  //   );
  // }
}
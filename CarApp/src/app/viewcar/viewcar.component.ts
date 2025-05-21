import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-viewcar',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatExpansionModule
  ],
  templateUrl: './viewcar.component.html',
  styleUrls: ['./viewcar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ViewcarComponent implements OnInit {
  cars: any[] = [];
  filteredCars: any[] = [];
  searchTerm: string = '';
  activeMenu: number | null = null;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCars();
  }

getCars(): void {
  // this.http.get<any[]>('http://localhost:3000/cars')
  this.http.get<any[]>('https://carslist.azurewebsites.net/cars')
  // this.http.get<any[]>('http://127.0.0.1:8080/api/cars')

    .subscribe({
      next: (data) => {
        console.log('Fetched Cars:', data); 
        this.cars = data;
        this.filteredCars = data; 
        this.filterCars();
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      },
    });
}
filterCars(): void {
  const term = this.searchTerm.toLowerCase().trim();
  if (!term) {
    this.filteredCars = this.cars;
    return;
  }

  this.filteredCars = this.cars.filter((car) => {
    return car.name.toLowerCase().includes(term) ||
           car.plateNo.toLowerCase().includes(term);
  });
}

  deleteCar(carID: number): void {
    if (confirm('Are you sure you want to delete this car?')) {
      // this.http.delete(`http://localhost:3000/cars/${carID}`) 
      this.http.delete(`https://carslist.azurewebsites.net/cars/${carID}`) // If using the remote server
      // this.http.delete(`http://127.0.0.1:8080/api/cars/${carID}`) 

        .subscribe({
          next: (response: any) => {
            console.log('Delete Response:', response);
            alert(response.message); 
            this.getCars(); // Reload the cars list to reflect the deletion
          },
          error: (err) => {
            console.error('There was an error deleting the car:', err);
            alert('An error occurred while deleting the car. Please try again.');
            this.getCars();

          },
        });
    }
  }
  


toggleMenu(carID: number): void{
  this.activeMenu = this.activeMenu === carID ? null : carID;
}

// openVicRoads(plate: string): void {
//   const cleanedPlate = plate.replace(/\s+/g, '');
//   window.open(`https://www.vicroads.vic.gov.au/registration/rego-check/registration-check?plate=${cleanedPlate}`, '_blank');
// }

  // filterCars(): void {
  //   const term = this.searchTerm.toLowerCase();
  //   this.filteredCars = this.cars.filter(
  //     (car) => car.name.toLowerCase().includes(term)
  //   );
  // }
}
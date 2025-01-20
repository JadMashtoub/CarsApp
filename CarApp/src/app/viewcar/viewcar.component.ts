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
  activeMenu: number | null = null;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCars();
  }

getCars(): void {
  this.http.get<any[]>('http://localhost:3000/cars')
  // this.http.get<any[]>('https://carslist.azurewebsites.net/cars')

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

  deleteCar(carID: number): void {
    if (confirm('Are you sure you want to delete this car?')) {
      // this.http.delete(`http://localhost:3000/cars/${carID}`) // Ensure proper URL format with backticks
      this.http.delete(`https://carslist.azurewebsites.net/cars/${carID}`) // If using the remote server
        .subscribe({
          next: (response: any) => {
            console.log('Delete Response:', response);
            alert(response.message); // Show the message from the backend
            this.getCars(); // Reload the cars list to reflect the deletion
          },
          error: (err) => {
            console.error('There was an error deleting the car:', err);
            alert('An error occurred while deleting the car. Please try again.');
            this.getCars(); // Reload the cars list to reflect the deletion

          },
        });
    }
  }
  


toggleMenu(carID: number): void{
  this.activeMenu = this.activeMenu === carID ? null : carID;
}


  // filterCars(): void {
  //   const term = this.searchTerm.toLowerCase();
  //   this.filteredCars = this.cars.filter(
  //     (car) => car.name.toLowerCase().includes(term)
  //   );
  // }
}
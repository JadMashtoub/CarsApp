import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../cars.service';

@Component({
  selector: 'app-viewcar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewcar.component.html',
  styleUrls: ['./viewcar.component.scss'],
})
export class ViewcarComponent implements OnInit {
  cars: any[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe(
      (data) => {
        this.cars = data;
        console.log('Cars loaded:', data);
      },
      (error) => {
        console.error('Error loading cars:', error);
      }
    );
  }
}

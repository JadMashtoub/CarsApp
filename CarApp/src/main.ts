import { bootstrapApplication } from '@angular/platform-browser';
import { ViewcarComponent } from './app/viewcar/viewcar.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CarService } from './app/cars.service';

bootstrapApplication(ViewcarComponent, {
  providers: [importProvidersFrom(HttpClientModule), CarService],
}).catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ViewcarComponent } from './app/viewcar/viewcar.component'
import { AddcarComponent } from './app/addcar/addcar.component'
import { LocationComponent } from './app/location/location.component'
import { provideAnimations } from '@angular/platform-browser/animations';


bootstrapApplication(ViewcarComponent, {
  providers: [provideHttpClient(), provideAnimations()]
}).catch(err => console.error(err));

bootstrapApplication(AddcarComponent, {
  providers: [provideHttpClient(), importProvidersFrom(FormsModule)], 
}).catch((err) => console.error(err));

bootstrapApplication(LocationComponent, {
  providers: [provideHttpClient(), importProvidersFrom(FormsModule)], 
}).catch((err) => console.error(err));
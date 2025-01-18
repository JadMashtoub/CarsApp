import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ViewcarComponent } from './app/viewcar/viewcar.component'
bootstrapApplication(ViewcarComponent, {
  providers: [provideHttpClient(), importProvidersFrom(FormsModule)], 
}).catch((err) => console.error(err));
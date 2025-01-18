import { Routes } from '@angular/router';
import { AddcarComponent } from './addcar/addcar.component';
import { HomeComponent } from './home/home.component';
import { ViewcarComponent } from './viewcar/viewcar.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'viewcar', component: ViewcarComponent},
    {path: 'addcar', component: AddcarComponent}
];

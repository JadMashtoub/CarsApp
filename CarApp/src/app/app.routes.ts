import { Routes } from '@angular/router';
import { AddcarComponent } from './addcar/addcar.component';
import { HomeComponent } from './home/home.component';
import { ViewcarsComponent } from './viewcars/viewcars.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'viewcars', component: ViewcarsComponent},
    {path: 'Addcar', component: AddcarComponent}
];

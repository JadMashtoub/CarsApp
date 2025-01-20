import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddcarComponent } from './addcar/addcar.component';
import { HomeComponent } from './home/home.component';
import { ViewcarComponent } from './viewcar/viewcar.component';
import { LocationComponent } from './location/location.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'viewcar', component: ViewcarComponent},
    {path: 'addcar', component: AddcarComponent},
    {path: 'location', component: LocationComponent}

];
@NgModule({ 
    imports: [RouterModule.forRoot(routes)], 
    exports: [RouterModule] }) 
    
export class AppRoutingModule { }

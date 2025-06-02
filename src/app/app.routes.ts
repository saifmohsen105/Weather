import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: "full" }
  ,
  { path: 'home', component: WeatherComponent },
  { path: 'about', component: WeatherComponent },
  { path: 'view', component: WeatherComponent },
  { path: 'contact', component: WeatherComponent },
];

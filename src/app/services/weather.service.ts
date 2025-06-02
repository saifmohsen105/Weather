import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InformationWeather } from '../interfaces/information-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  http = inject(HttpClient);



getWeather(country: string = 'cairo'): Observable<InformationWeather> {
  return this.http.get<InformationWeather>(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${country}&days=3`
  );
}

}

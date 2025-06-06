import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InformationWeather } from '../interfaces/information-weather';
import { WeatherService } from '../services/weather.service';
import { Section2HomePageComponent } from './section-2-home-page/section-2-home-page/section-2-home-page.component';
import { Section1HomePageComponent } from "./section-1-home-page/section-1-home-page/section-1-home-page.component";

@Component({
  selector: 'app-weather',
  imports: [RouterLink, RouterLinkActive, FormsModule, Section1HomePageComponent, Section2HomePageComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  weatherService = inject(WeatherService)
  weather: InformationWeather[] = [];
  country = '';
  http = inject(HttpClient)
  loading: boolean = true;


  getWather() {
    this.weatherService.getWeather(this.country).subscribe({
      next: (res) => {
        this.weather = Array(res);
        this.loading = false
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  async ngOnInit(): Promise<void> {
    this.country = await this.getLocationUser();
    this.getWather();
  }

  async getLocationUser(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const apiKey = '7d77b96c972b4d119a3151101212704';

          try {
            const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3`);
            const data = await res.json();
            resolve(data.location.name);
          } catch (error) {
            reject('Failed to fetch location data');
          }
        }, error => {
          reject('Geolocation permission denied');
        });
      } else {
        reject('Geolocation not supported');
      }
    });
  }

}

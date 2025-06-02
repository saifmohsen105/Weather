import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InformationWeather } from '../interfaces/information-weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  weatherService = inject(WeatherService)
  weather: InformationWeather[] = [];
  country: string = this.getLocationUser();
  http = inject(HttpClient)



  getWather() {
    this.weatherService.getWeather(this.country).subscribe({
      next: (res) => {
        this.weather = Array(res);
        console.log(this.weather);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getWather()
  }

  getLocationUser(): string {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = '7d77b96c972b4d119a3151101212704';

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3`)
          .then(res => res.json())
          .then(data => {
            this.country = data.location.name
          });
      });

    }
    return this.country
  }
}

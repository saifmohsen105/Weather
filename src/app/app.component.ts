import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WeatherComponent } from "./weather/weather.component";
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'weather';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: true
      });
    }
  }
}

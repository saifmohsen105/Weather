// import { AOS } from 'aos';
import { Component, Input, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { InformationWeather } from '../../../interfaces/information-weather';

@Component({
  selector: 'app-section-1-home-page',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: "./section-1-home-page.component.html"
})
export class Section1HomePageComponent {
  @Input({ required: true }) detailsWeather: InformationWeather[] = []

  temp: number[] = [];
  days: string[] = [];
  country: string = '';
  series: ApexAxisChartSeries = [
    {
      name: 'Temperature',
      data: []
    }
  ];

  chart: ApexChart = {
    type: 'area',
    height: 350
  };

  title: ApexTitleSubtitle = {
    text: ``,
  };

  xaxis: ApexXAxis = {
    categories: []
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['detailsWeather'] && this.detailsWeather.length > 0) {
      this.initChart();
    }
  }
  async getTemp(): Promise<number[]> {
    const temp: number[] = [];
    for (const weather of this.detailsWeather) {
      for (const day of weather.forecast.forecastday) {
        temp.push(day.day.maxtemp_c);
      }
    }
    return temp;
  }
  async getNameWeek(): Promise<string[]> {
    const days: string[] = [];
    for (const weather of this.detailsWeather) {
      for (const day of weather.forecast.forecastday) {
        const date = new Date(day.date);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        days.push(weekday)
      }
    }

    return days;
  }
  async getCountry(): Promise<string> {
    return this.detailsWeather[0]?.location.name ?? '';
  }
  async initChart(): Promise<void> {
    const temps = await this.getTemp();
    const days = await this.getNameWeek();
    const currentCountry = await this.getCountry();
    this.temp = temps;
    this.days = days;
    this.country = currentCountry;

    this.series = [{ name: 'Temperature', data: this.temp }];
    this.xaxis = { categories: this.days };
    this.title = { text: `Weekly Temperature in ${this.country}`, align: 'center' };
  }
}

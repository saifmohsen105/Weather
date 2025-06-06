import { InformationWeather } from './../../../interfaces/information-weather';
import { Component, Input, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';
@Component({
  selector: 'app-section-2-home-page',
  imports: [NgApexchartsModule],
  templateUrl: './section-2-home-page.component.html',
  styleUrl: './section-2-home-page.component.css'
})
export class Section2HomePageComponent {
  @Input({ required: true }) detailsWeather: InformationWeather[] = [];
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
    type: 'bar',
    height: 350,
    toolbar: { show: false  }


  };
  plotOptions = {
    bar: {
      borderRadius: 4,
      horizontal: false,
    }
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
  async getWind(): Promise<number[]> {
    const wind: number[] = [];
    for (const weather of this.detailsWeather) {
      for (const day of weather.forecast.forecastday) {
        wind.push(day.day.maxwind_kph);
      }
    }
    return wind;
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
    const wind = await this.getWind();
    const days = await this.getNameWeek();
    const currentCountry = await this.getCountry();
    this.temp = wind;
    this.days = days;
    this.country = currentCountry;

    this.series = [{ name: 'Wind ', data: this.temp }];
    this.xaxis = { categories: this.days };
    this.title = { text: `Weekly wind in ${this.country}`, align: 'center' };
  }
}

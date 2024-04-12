import {Component, OnInit} from '@angular/core';
import {ApexOptions} from "apexcharts";
import {NgApexchartsModule} from "ng-apexcharts";

@Component({
  selector: 'app-options-line-chart',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './options-line-chart.component.html',
  styleUrl: './options-line-chart.component.css'
})
export class OptionsLineChartComponent implements OnInit{
  public chartOptions: ApexOptions | any;

  constructor() {
    this.chartOptions = {
      chart: {
        height: 328,
        type: 'line',
        zoom: {
          enabled: false
        },
        dropShadow: {
          enabled: true,
          top: 3,
          left: 2,
          blur: 4,
          opacity: 1,
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      series: [
        { name: "TouristAttraction 1", data: [1, 15, 26, 20, 33, 27] },
        { name: "TouristAttraction 2", data: [3, 33, 21, 42, 19, 32] },
        { name: "TouristAttraction 3", data: [0, 39, 52, 11, 29, 43] }
      ],
      title: {
        text: 'Visits',
        align: 'left',
        offsetY: 25,
        offsetX: 20
      },
      subtitle: {
        text: 'Reviews',
        offsetY: 55,
        offsetX: 20
      },
      markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
          size: 9
        }
      },
      grid: {
        show: true,
        padding: { bottom: 0 }
      },
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      xaxis: { tooltip: { enabled: false } },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -20
      }
    };
  }

  ngOnInit(): void {
  }

}

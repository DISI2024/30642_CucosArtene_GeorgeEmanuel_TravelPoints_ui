import {Component, OnInit} from '@angular/core';
import {ApexOptions} from "apexcharts";
import {NgApexchartsModule} from "ng-apexcharts";

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.css'
})
export class AreaChartComponent implements OnInit{
  public chartOptions: ApexOptions | any;
  constructor() {
  this.chartOptions = {
    chart: {
      height: 328,
      type: 'area',
      stacked: false,
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      name: "TouristAttraction 1",
      data: [11, 15, 26, 20, 33, 27]
    },
      {
        name: "TouristAttraction 2",
        data: [32, 33, 21, 42, 19, 32]
      },
      {
        name: "TouristAttraction 3",
        data: [20, 39, 52, 11, 29, 43]
      }
    ],
    xaxis: {
      categories: ['2019', '2020', '2021', '2022', '2023', '2024'],
    },
    tooltip: {
      followCursor: true
    },
    fill: {
      opacity: 1,
    },
  };
  }


  ngOnInit(): void {
  }

}

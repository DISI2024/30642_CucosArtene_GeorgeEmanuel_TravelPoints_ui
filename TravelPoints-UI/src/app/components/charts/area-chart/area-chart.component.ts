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
      type: 'bar',
      stacked: false,
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
      name: "TouristAttraction",
      data: []
    }
    ],
    xaxis: {
      categories: [],
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
    this.chartOptions = {
      chart: {
        height: 328,
        type: 'bar',
        stacked: false,
      },
      stroke: {
        curve: 'straight'
      },
      series: [{
        name: "TouristAttraction",
        data: []
      }
      ],
      xaxis: {
        categories: [],
      },
      tooltip: {
        followCursor: true
      },
      fill: {
        opacity: 1,
      },
    };
  }

}

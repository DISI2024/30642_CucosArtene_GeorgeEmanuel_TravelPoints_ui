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
      series: [],
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }


  ngOnInit(): void {
    this.chartOptions = {
    series: [1, 2, 3, 4],
    chart: {
      width: 535,
      height: 700,
      type: 'pie'
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 535,
            height: 700
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };
  }
}

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {OptionsLineChartComponent} from "../charts/options-line-chart/options-line-chart.component";
import {AreaChartComponent} from "../charts/area-chart/area-chart.component";
import {TableComponent} from "../table/table.component";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {jwtDecode} from 'jwt-decode'
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {TouristAttractionService} from "../../services/tourist-attraction.service";
import {TouristAttraction} from "../../models/TouristAttraction";
import {ReviewService} from "../../services/review.service";
import {HourStatistic} from "../../models/HourStatistic";
import {MonthStatistic} from "../../models/MonthStatistic";
import {TouristAttractionVisits} from "../../models/TouristAttractionVisits";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    OptionsLineChartComponent,
    AreaChartComponent,
    TableComponent,
    NavigationBarComponent,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    HttpClientModule,
    NgIf
  ],
  providers: [TouristAttractionService, ReviewService],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  touristAttractions: TouristAttraction[] = []
  days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  months: string[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  years: number[] = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014]
  username: string = ""
  selectedTouristAttraction: TouristAttraction | undefined
  selectedDay: string = ""
  selectedYear: number | undefined
  myForm: any
  hourStatistics: Array<number> = []
  monthStatistics: Array<number> = []
  statisticType: string = ""
  touristAttractionVisits: Array<number> = []
  touristAttractionNames: Array<string> = []

  @ViewChild(AreaChartComponent) areaChartComponent!: AreaChartComponent;
  @ViewChild(OptionsLineChartComponent) optionsChartComponent!: OptionsLineChartComponent;

  constructor(
    private touristAttractionService: TouristAttractionService,
    private fb: FormBuilder,
    private reviewService: ReviewService
  ) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      selectedTouristAttraction: [''],
      selectedDay: ['']
    })

    let token = localStorage.getItem('token')
    if (token) {
      const tokenPayload: any = jwtDecode(token)
      this.username = tokenPayload.userType
    }

    this.touristAttractionService.getAllTouristAttractions().subscribe((touristAttractions: TouristAttraction[]) => {
      this.touristAttractions = touristAttractions
    })

    this.reviewService.getNumberOfVisitsPerAttraction().subscribe((touristAttractionVisits: TouristAttractionVisits[]) => {
      this.touristAttractionVisits = []
      this.touristAttractionNames = []
      touristAttractionVisits.forEach(touristAttractionVisit => {
        this.touristAttractionVisits.push(touristAttractionVisit.noOfVisits!)
        this.touristAttractionNames.push(touristAttractionVisit.name!)
      })
      this.optionsChartComponent.chartOptions.labels = this.touristAttractionNames
      this.optionsChartComponent.chartOptions.series = this.touristAttractionVisits
    })
  }

  ngAfterViewInit(): void {
  }

  selectionChange() {
    if (this.statisticType!) {
      if (this.statisticType === 'days') {
        if (this.selectedDay! && this.selectedTouristAttraction!) {
          this.reviewService.getDayStatistic(this.selectedTouristAttraction.attractionId!, this.selectedDay).subscribe((hourStatistics: HourStatistic[]) => {
            this.hourStatistics = []
            hourStatistics.forEach(hourStatistic => {
              this.hourStatistics.push(hourStatistic.numberOfVisits!)
            })
            this.areaChartComponent.chartOptions.series = [{
              name: this.selectedTouristAttraction?.name + "",
              data: this.hourStatistics
            }]
            this.areaChartComponent.chartOptions.xaxis = {
              categories: this.generateHoursArray(this.selectedTouristAttraction?.openingTime!, this.selectedTouristAttraction?.closingTime!)
            }
          })
        }
      } else {
        if (this.selectedYear! && this.selectedTouristAttraction!) {
          this.reviewService.getMonthStatistic(this.selectedTouristAttraction.attractionId!, this.selectedYear).subscribe((monthStatistics: MonthStatistic[]) => {
            this.monthStatistics = []
            monthStatistics.forEach(monthStatistic => {
              this.monthStatistics.push(monthStatistic.numberOfVisits!)
            })
            this.areaChartComponent.chartOptions.series = [{
              name: this.selectedTouristAttraction?.name + "",
              data: this.monthStatistics
            }]
            this.areaChartComponent.chartOptions.xaxis = {
              categories: this.months
            }
          })
        }
      }
    }
  }

  generateHoursArray(openingTime: string, closingTime: string): string[] {
    const hoursArray: string[] = []
    const [openingHour, openingMinute] = openingTime.split(':').map(Number)
    const [closingHour, closingMinute] = closingTime.split(':').map(Number)
    for (let hour = openingHour; hour <= closingHour; hour++) {
      hoursArray.push(`${hour}:00`)
    }
    return hoursArray
  }
}

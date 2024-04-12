import {Component, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {OptionsLineChartComponent} from "../charts/options-line-chart/options-line-chart.component";
import {AreaChartComponent} from "../charts/area-chart/area-chart.component";
import {TableComponent} from "../table/table.component";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {HttpClient} from "@angular/common/http";
import {jwtDecode} from 'jwt-decode'

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
    NavigationBarComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  username: string = ""

  constructor() {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if(token) {
      const tokenPayload: any = jwtDecode(token);
      this.username = tokenPayload.userType
    }
  }


}

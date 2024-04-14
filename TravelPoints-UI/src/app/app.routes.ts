import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {TouristAttractionPageComponent} from "./components/tourist-attraction-page/tourist-attraction-page.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'tourist-attractions', component: TouristAttractionPageComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

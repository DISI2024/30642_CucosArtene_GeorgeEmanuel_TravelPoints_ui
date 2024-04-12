import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

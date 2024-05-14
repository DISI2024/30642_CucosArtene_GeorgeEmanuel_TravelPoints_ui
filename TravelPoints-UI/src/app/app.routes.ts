import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {TouristAttractionPageComponent} from "./components/tourist-attraction-page/tourist-attraction-page.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import { AdminAuthGuard } from './guards/admin-auth.guard';
import {MyWishlistPageComponent} from "./components/my-wishlist-page/my-wishlist-page.component";

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'tourist-attractions', component: TouristAttractionPageComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard]},
  {path: 'my-wishlist', component: MyWishlistPageComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

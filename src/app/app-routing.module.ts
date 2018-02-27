import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouletteComponent } from './roulette/roulette.component';
import { ContainerComponent } from './container/container.component';

let childrenRoutes = [

    { path: 'home', component: HomeComponent },
    { path: 'roulette', component: RouletteComponent },

];
const appRoutes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'dashboard', component: ContainerComponent, children: childrenRoutes },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }

];

export const routableComponents = [
    HomeComponent,
    LoginComponent,
    RouletteComponent,
    ContainerComponent,
    PageNotFoundComponent
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
}) export class AppRoutingModule { }


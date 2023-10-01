import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroDetailComponent } from './pages/heroes/hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: '**', redirectTo: '/heroes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

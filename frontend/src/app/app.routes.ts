import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SetDetailComponent } from './components/set-detail/set-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  }, 
  {
    path: 'year/:year',
    component: HomeComponent,
    title: 'Bionicles by Year'
  },
  {
    path: 'year/:year/set/:id',
    component: SetDetailComponent,
    title: 'Set Detail',
  }
];

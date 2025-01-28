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
    path: 'set/:id',
    component: SetDetailComponent,
    title: 'Set Detail',
  }
];

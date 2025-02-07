import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SetDetailComponent } from './components/set-detail/set-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home Page',
    redirectTo: '/year/2001',
    pathMatch: 'full',
  },
  {
    path: 'year/:year',
    component: HomeComponent,
    title: 'Bionicles by Year',
    canActivate: [
      (route: { params: { [x: string]: string } }) => {
        const year = parseInt(route.params['year'], 10);
        if (year >= 2011 && year <= 2014) {
          window.location.href = '/year/2001';
          return false;
        }
        return true;
      },
    ],
  },
  {
    path: 'year/:year/set/:id',
    component: SetDetailComponent,
    title: 'Set Detail',
    canActivate: [
      (route: { params: { [x: string]: string } }) => {
        const year = parseInt(route.params['year'], 10);
        if (year >= 2011 && year <= 2014) {
          window.location.href = '/year/2001';
          return false;
        }
        return true;
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page Not Found',
  },
];

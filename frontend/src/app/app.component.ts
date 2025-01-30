import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div id="page-container" class="container mx-auto p-5">
      <div id="content-wrap">
        <app-header />
        <main id="main" class="mt-8">
          <router-outlet></router-outlet>
        </main>
      </div>
      <footer id="footer" class="text-center text-[0.65rem] py-4">
        &copy; ToaTool is Designed and Developed by Alex Wilkins. <br />All
        rights Reserved.
      </footer>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {}

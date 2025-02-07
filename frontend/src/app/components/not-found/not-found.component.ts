import { NgOptimizedImage, CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [NgOptimizedImage, CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center h-[50vh]">
      <img
        [ngSrc]="notFoundImage"
        alt="404 - Page Not Found"
        class="mb-4 rounded-md"
        width="447"
        height="251.5"
      />
      <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p class="text-lg mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" class="text-blue-500 hover:underline">Go back to Home</a>
    </div>
  `,
})
export class NotFoundComponent {
  notFoundImage: string = 'assets/images/not-found.png';
}

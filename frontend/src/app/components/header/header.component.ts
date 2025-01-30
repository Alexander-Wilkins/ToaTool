import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, CommonModule, FormsModule],
  template: `<header
      class="flex-row items-center justify-between gap-2 lg:flex"
    >
      <div class="p-7">
        <a href="/" class="block">
          <img
            [ngSrc]="toaToolLogo"
            alt="Toa Tool with cross pickaxe LEGO pieces"
            width="446"
            height="80"
          />
        </a>
      </div>
      <form class="flex flex-row items-center gap-2 px-4">
        <strong>Year</strong>
        <select
          class="w-full rounded border border-black bg-gray-100 p-2 lg:w-[16.875rem]"
        >
          <option *ngFor="let year of years" [value]="year">{{ year }}</option>
        </select>
        <button
          type="submit"
          (click)="pickYear()"
          class="rounded border border-black p-[0.4rem] font-bold"
        >
          SUBMIT
        </button>
      </form>
    </header>
    `,
})
export class HeaderComponent {
  toaToolLogo: string = 'images/toaTool-logo.png';
  years: string[] = Array.from({ length: 16 }, (_, i) => (2001 + i).toString());
  selectedYear: string = '';

  pickYear() {
    this.selectedYear = document.querySelector('select')?.value || '';
    window.location.pathname = `/year/${this.selectedYear}`;
  }
}

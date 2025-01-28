import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, CommonModule],
  template: `<header class="flex-row items-center justify-between gap-2 lg:flex">
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
  <div class="flex flex-row items-center gap-2 px-4">
    <strong>Year</strong>
    <select
      class="w-full rounded border border-black bg-gray-100 p-2 lg:w-[16.875rem]"
    >
      <option *ngFor="let year of years; let i = index" [value]="year">{{ year }}</option>
    </select>
    <button class="rounded border border-black p-[0.4rem] font-bold">GO</button>
  </div>
</header>
`
})
export class HeaderComponent {
  toaToolLogo: string = 'images/toaTool-logo.png';
  years: number[] = Array.from({ length: 2016 - 2001 + 1 }, (_, i) => 2001 + i);
}

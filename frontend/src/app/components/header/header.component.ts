import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, CommonModule, FormsModule],
  host: { hostID: crypto.randomUUID().toString() },
  template: `<header
    class="flex-row items-center justify-between gap-2 lg:flex"
  >
    <div class="p-7">
      <img
        [ngSrc]="toaToolLogo"
        alt="Toa Tool with cross pickaxe LEGO pieces"
        width="446"
        height="80"
      />
    </div>
    <form class="flex flex-row items-center gap-2 px-4">
      <strong>Year</strong>
      <select
        class="w-full rounded border border-black bg-gray-100 p-2 lg:w-[16.875rem]"
      >
        <option selected disabled value>-- Select Year --</option>
        <option value="2001">2001</option>
        <option value="2002">2002</option>
        <option value="2003">2003</option>
        <option value="2004">2004</option>
        <option value="2005">2005</option>
        <option value="2006">2006</option>
        <option value="2007">2007</option>
        <option value="2008">2008</option>
        <option value="2009">2009</option>
        <option value="2010">2010</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
      </select>
      <button
        type="submit"
        (click)="pickYear($event)"
        class="rounded border border-black p-[0.4rem] font-bold"
      >
        SUBMIT
      </button>
    </form>
  </header> `,
})
export class HeaderComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  
  toaToolLogo: string = 'images/toaTool-logo.png';
  selectedYear: string = this.route.snapshot.params['year'] || '';

  pickYear(event: Event) {
    event.preventDefault();
    this.selectedYear = document.querySelector('select')?.value || '';
    window.location.pathname = `/year/${this.selectedYear}`;
  }
}

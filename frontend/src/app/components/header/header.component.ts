import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BionicleSetDataService } from '../../bionicle-set-data.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, CommonModule, FormsModule, ReactiveFormsModule],
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
    <form
      class="flex flex-row items-center gap-2 px-4"
      [formGroup]="changeYearForm"
      (ngSubmit)="pickTheYear($event)"
    >
      <strong>Current Year:</strong>
      <select
        class="w-full rounded border border-black bg-gray-100 p-2 lg:w-[16.875rem]"
        formControlName="year"
        name="bionicleYears"
      >
        <option value disabled selected >{{ pickedYear }}</option>
        <option
          *ngFor="let bionicleYear of bionicleYears"
          [ngValue]="bionicleYear"
        >
          {{ bionicleYear }}
        </option>
      </select>
      <button
        type="submit"
        class="rounded border p-2 font-bold border-gray-300 shadow-sm transition-all hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1 hover:cursor-pointer active:translate-y-0 active:shadow-sm"
      >
        SUBMIT
      </button>
    </form>
  </header> `,
})
export class HeaderComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  toaToolLogo: string = 'images/toaTool-logo.png';

  bionicleYears: string[] = Array.from({ length: 10 }, (_, i) =>
    (2001 + i).toString(),
  ).concat(['2015', '2016']);

  pickedYear: string = '';

  changeYearForm = this.fb.group({
    year: '',
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.pickedYear = this.getCurrentYearFromUrl();
      });
  }

  pickTheYear(event: Event) {
    event.preventDefault();
    window.location.pathname = `/year/${this.changeYearForm.value.year}`;
  }

  getCurrentYearFromUrl(): string {
    const urlSegments = this.router.url.split('/');
    const yearSegment = urlSegments.find((segment) => /^\d{4}$/.test(segment));
    return yearSegment || '';
  }
}
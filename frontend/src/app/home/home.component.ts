import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetCardComponent } from '../components/set-card/set-card.component';
import { BionicleSetDataService } from '../bionicle-set-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SetCardComponent],
  host: { hostID: crypto.randomUUID().toString() },
  template: `
    <div class="flex flex-col lg:flex-row justify-between items-center mb-4">
      <div id="left">
        <h2 class="pr-4 pt-4 font-bold text-2xl">Year: {{ selectedYear }}</h2>
        <p class="pb-4">{{ (bionicles$ | async)?.length }} Total Bionicles</p>
      </div>
      <form
        id="right"
        class="flex flex-row items-center gap-2 px-4"
        role="search"
      >
        <div
          class="rounded border border-black bg-gray-100 p-2 w-[19.75rem] flex flex-row justify-between items-center"
        >
          <label for="search" aria-label="Search Bionicles"></label>
          <input
            id="search-bionicles"
            type="search"
            name="search"
            spellcheck="false"
            class="ml-2 w-full outline-none"
            placeholder="Search Bionicles..."
            aria-label="Sitewide"
          />
        </div>
        <button
          type="submit"
          class="rounded border p-2 h-[2.625rem] font-bold border-gray-300 shadow-sm transition-all text-white bg-blue-600 hover:bg-blue-800 hover:shadow-xl hover:-translate-y-1 hover:cursor-pointer active:translate-y-0 active:shadow-sm"
        >
          <span class="px-2"><i class="fa-solid fa-magnifying-glass"></i></span>
        </button>
      </form>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 mb-20"
    >
      <app-set-card
        *ngFor="let bionicle of bionicles$ | async"
        [setData]="bionicle"
      />
    </div>
  `,
})
export class HomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  bionicleService: BionicleSetDataService = inject(BionicleSetDataService);

  defaultYear = '2001';
  selectedYear = this.route.snapshot.paramMap.get('year') || this.defaultYear;
  bionicles$ = this.bionicleService.getAllBionicleDataByYear(this.selectedYear);
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetCardComponent } from '../components/set-card/set-card.component';
import { BionicleSetDataService } from '../bionicle-set-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SetCardComponent, FormsModule, ReactiveFormsModule],
  host: { hostID: crypto.randomUUID().toString() },
  template: `
    <div class="flex flex-col lg:flex-row mb-4 items-center justify-between">
      <form
        id="right"
        class="flex flex-col items-center lg:items-end gap-2"
        [formGroup]="searchBionicles"
        (ngSubmit)="searchBionicle($event)"
      >
        <div id="search-bar" class="flex flex-row items-center gap-2">
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
              formControlName="query"
            />
          </div>
          <button
            type="submit"
            class="rounded border p-2 h-[2.625rem] font-bold border-gray-300 shadow-sm transition-all text-white bg-blue-600 hover:bg-blue-800 hover:shadow-xl hover:-translate-y-1 hover:cursor-pointer active:translate-y-0 active:shadow-sm"
          >
            <span class="px-2"
              ><i class="fa-solid fa-magnifying-glass"></i
            ></span>
          </button>
        </div>
      </form>
      <div>
        <h2 class="py-4">
          <strong>{{ (bionicles$ | async)?.length }}</strong> Total Bionicles
        </h2>
      </div>
    </div>

    @defer {
      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 mb-20"
      >
        <app-set-card
          *ngFor="let bionicle of bionicles$ | async"
          [setData]="bionicle"
        />
      </div>
    } @loading {
      <p>Loading Bionicles...</p>
    }
  `,
})
export class HomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  bionicleService: BionicleSetDataService = inject(BionicleSetDataService);
  router: Router = inject(Router);

  defaultYear = '2001';
  selectedYear = this.route.snapshot.paramMap.get('year') || this.defaultYear;
  bionicles$ = this.bionicleService.getAllBionicleDataByYear(this.selectedYear);
  loading = false;
  isSearchRoute = this.route.snapshot.url[0]?.path === 'search';

  constructor(private fb: FormBuilder) {}

  searchBionicles = this.fb.group({
    query: '',
  });

  searchBionicle(event: Event) {
    event.preventDefault();
    const query = this.searchBionicles.value.query;
    if (query) {
      this.bionicles$ = this.bionicleService.getSpecificBionicleData(query);
    }
  }
}

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
    <h2 class="pr-4 pt-4 font-bold text-2xl">Year: {{ selectedYear }}</h2>
    <p class="pb-4">{{ (bionicles$ | async)?.length }} Total Bionicles</p>

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

  constructor() {
    // Subscription logic is no longer needed as bionicles is now an Observable
  }
}

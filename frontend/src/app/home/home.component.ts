import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetCardComponent } from '../components/set-card/set-card.component';
import { BionicleSetDataService } from '../bionicle-set-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SetCardComponent],
  template: `
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4"
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
  bionicles$ = this.bionicleService.getAllBionicleDataByYear(this.defaultYear);
  constructor() {
    window.history.pushState({}, '', this.defaultYear);
  }
}

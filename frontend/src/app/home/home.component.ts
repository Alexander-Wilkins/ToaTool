import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetCardComponent } from '../components/set-card/set-card.component';
import { ISetData } from '../set-data';
import { BionicleSetDataService } from '../bionicle-set-data.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SetCardComponent],
  // templateUrl: './home.component.html',
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        <app-set-card *ngFor="let bionicle of bionicles$ | async" [setData]="bionicle"/>
    </div>
  `,
})
export class HomeComponent {
  bionicleService: BionicleSetDataService = inject(BionicleSetDataService);

  bionicles$ = this.bionicleService.getAllBionicleDataByYear('2003');
}

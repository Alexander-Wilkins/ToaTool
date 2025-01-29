import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetCardComponent } from '../components/set-card/set-card.component';
import { ISetData } from '../set-data';
import { BionicleSetDataService } from '../bionicle-set-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SetCardComponent],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        <app-set-card *ngFor="let bionicle of bionicles" [setData]="bionicle"/>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  bionicleService: BionicleSetDataService = inject(BionicleSetDataService);

  bionicles: ISetData[] = [];
  
  ngOnInit() {
    this.bionicleService.getAllBionicleDataByYear('2003').subscribe(data => {
      this.bionicles = data;
    });
  }
}

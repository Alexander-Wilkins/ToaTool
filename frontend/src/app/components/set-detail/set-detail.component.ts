import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BionicleSetDataService } from '../../bionicle-set-data.service';

@Component({
  selector: 'app-set-detail',
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div *ngIf="bionicleDataList$ | async as bionicleDataList">
      <div class="max-w-[61.25rem] flex flex-col items-center mx-auto mt-8">
        <div
          id="top-content"
          class="flex flex-col items-center md:flex-row md:gap-4"
        >
          <div>
            <strong class="text-[26px] py-4"
              >{{ bionicleDataList.set_num }}:
              <span>{{ bionicleDataList.name }}</span></strong
            >
            <br />
            <div class="text-[1.125rem]">{{ bionicleDataList.year }}</div>
          </div>
          <img
            ngSrc="{{ bionicleDataList.set_img_url }}"
            alt="{{ bionicleDataList.name }} {{ bionicleDataList.year }}"
            width="360"
            height="369"
            class="h-[270px] w-[360px] rounded-md object-cover"
          />
        </div>
        <div class="mt-8">
          <h2 class="font-bold text-[1.625rem]">Standard Pieces:</h2>
          <div class="grid grid-cols-3 2xl:grid-cols-9 gap-4 mt-4 align-center">
            <div
              *ngFor="let piece of bionicleDataList.pieces"
              id="piece-card"
              class="relative p-2 mt-3 text-center w-[6.25rem] h-[6.875rem] border border-gray-300 shadow-sm transition-all hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1"
            >
              <div
                class="absolute text-[#41B8FC] border border-black px-1 -top-[0.5rem] -right-[0.5rem] bg-white text-[0.75rem] z-10"
              >
                QTY: {{ piece.quantity }}
              </div>
              <img
                [ngSrc]="piece.part_img_url"
                alt="LEGO Piece"
                width="80"
                height="85"
                class="mix-blend-multiply"
              />
              <div class="text-[0.75rem] align-top">{{ piece.part_num }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SetDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  bionicleService: BionicleSetDataService = inject(BionicleSetDataService);

  setIdParam: string = this.route.snapshot.params['id'] || '';
  bionicleDataList$ = this.bionicleService.getBionicleDataById(this.setIdParam);
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BionicleSetDataService } from '../../bionicle-set-data.service';
import { ISetPieces, ISetData } from '../../set-data';
import { map } from 'rxjs';

@Component({
  selector: 'app-set-detail',
  imports: [CommonModule, NgOptimizedImage],
  host: { hostID: crypto.randomUUID().toString() },
  template: `
    <div>
      <a
        href="javascript:history.back()"
        class="rounded border p-4 font-bold border-gray-300 shadow-sm transition-all hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1"
        >< Back</a
      >
    </div>
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
              *ngFor="let piece of bionicleDataList.pieces; let i = index"
              id="piece-card"
              class="relative p-2 mt-3 text-center w-[6.25rem] h-[6.875rem] border border-gray-300 shadow-sm transition-all hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1"
              [ngClass]="{
                'bg-red-200': comparePieces(piece),
                'bg-white': !comparePieces(piece),
              }"
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
  bioniclePieces$ = this.bionicleDataList$.pipe(
    map((data: ISetData) => data.pieces),
  );
  tubOfPieces: ISetPieces[] = [
    {
      part_num: '32171pr0005',
      part_img_url:
        'https://cdn.rebrickable.com/media/parts/photos/0/32171pb005-0-a0154156-134c-4cc1-a69d-7585131c36f9.jpg',
      quantity: 1,
    },
    {
      part_num: '32579',
      part_img_url:
        'https://cdn.rebrickable.com/media/parts/elements/4193957.jpg',
      quantity: 1,
    },
    {
      part_num: '32576',
      part_img_url:
        'https://cdn.rebrickable.com/media/parts/elements/4156764.jpg',
      quantity: 2,
    },
  ];

  constructor() {}

  comparePieces(toCompare: ISetPieces): boolean {
    return this.tubOfPieces.some(
      (piece) =>
        piece.part_num === toCompare.part_num &&
        piece.part_img_url === toCompare.part_img_url &&
        piece.quantity === toCompare.quantity,
    );
  }
}

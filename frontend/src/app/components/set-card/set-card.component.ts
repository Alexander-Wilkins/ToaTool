import { Component, Input } from '@angular/core';
// import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ISetData } from '../../set-data';

@Component({
  selector: 'app-set-card',
  imports: [NgOptimizedImage],
  host: { hostID: crypto.randomUUID().toString() },
  template: `
    <a
      href="{{ 'year/' + setData.year + '/set/' + setData.set_num }}"
      class="block"
      class="p-5 inline-block rounded-md border border-gray-300 shadow-sm transition-all hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1 "
    >
      <img
        ngSrc="{{ setData.set_img_url }}"
        alt="{{ setData.name }} {{ setData.year }}"
        width="360"
        height="369"
        class="h-[270px] w-[360px] rounded-md object-cover"
      />
      <br />
      <strong class="text-[26px]"
        >{{ setData.set_num }}: <span>{{ setData.name }}</span></strong
      >
    </a>
  `,
})
export class SetCardComponent {
  @Input() setData!: ISetData;
}

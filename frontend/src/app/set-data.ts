export interface ISetPieces {
  part_num: string;
  part_img_url: string;
  quantity: number;
}

export interface ISetData extends ISetPieces {
  set_num: string;
  name: string;
  year: number;
  set_img_url: string;
  pieces: ISetPieces[];
}


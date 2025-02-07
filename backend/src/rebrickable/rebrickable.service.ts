import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { promises } from 'dns';
import { firstValueFrom, catchError } from 'rxjs';

@Injectable()
export class RebrickableService {
  private readonly _rebrickableKey: string = '9fb8e2fe27824be982cb60651c5e44c1';
  private readonly _logger = new Logger(RebrickableService.name);
  private readonly _baseUrl: string =
    'https://rebrickable.com/api/v3/lego/sets/';
  private readonly _themeId: string = '324';
  private readonly _rebrickableAuthorizationKey = {
    Authorization: `key ${this._rebrickableKey}`,
  };

  constructor(private readonly _httpService: HttpService) {}

  private async _fetchData(url: string): Promise<any> {
    return await firstValueFrom(
      this._httpService
        .get<any>(url, { headers: this._rebrickableAuthorizationKey })
        .pipe(
          catchError((error: AxiosError) => {
            this._logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
  }

  private _filterSets(data: any): any[] {
    const maxCharactersForSetNum = 7;
    const regexToRemoveParantheses = / *\([^)]*\) */g;
    const regexToRemoveBrackets = / *\[[^\]]*\] */g;
    const regexToFilter =
      /(kit|pack|value|BIONICLE|Nestlé|collection|give|away|QUICK|chamber|launcher|battle|gift|500|good|bad|function|catapult)/i;
    const regexToFilterSetNum = /^K/i;

    return data.results
      .filter((bionicle) => bionicle.set_num.length <= maxCharactersForSetNum)
      .filter((bionicle) => !regexToFilter.test(bionicle.name))
      .filter((bionicle) => !regexToFilterSetNum.test(bionicle.set_num))
      .map((bionicle) => ({
        set_num: bionicle.set_num,
        name: bionicle.name
          .replace(regexToRemoveParantheses, '')
          .replace(regexToRemoveBrackets, ''),
        year: bionicle.year,
        set_img_url: bionicle.set_img_url,
      }));
  }

  private async _fetchPiecesBySetIdNumber(setId: string): Promise<any> {
    const url = `${this._baseUrl}${setId}/parts/`;
    const { data } = await this._fetchData(url);
    return data.results.map((bionicle) => ({
      part_num: bionicle.part.part_num,
      part_img_url: bionicle.part.part_img_url,
      quantity: bionicle.quantity,
    }));
  }

  async findAll(maxYear: string): Promise<any> {
    const url = `${this._baseUrl}?theme_id=${this._themeId}&min_year=${maxYear}&max_year=${maxYear}`;
    const { data } = await this._fetchData(url);
    return this._filterSets(data);
  }

  async findOneSet(id: string, year: string): Promise<any> {
    const allSets = await this.findAll(year);
    const setDetails = allSets.find((set) => set.set_num === id) || null;
    const pieces = await this._fetchPiecesBySetIdNumber(id);
    return {
      ...setDetails,
      pieces: pieces,
      year: year,
    };
  }

  async findSpecificBionicle(query): Promise<any> {
    const url = `${this._baseUrl}?theme_id=${this._themeId}&search=${query}`;
    const {data} = await this._fetchData(url);
    return this._filterSets(data);
  }
}

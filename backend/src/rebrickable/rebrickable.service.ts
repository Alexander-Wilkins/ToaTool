import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';

@Injectable()
export class RebrickableService {
  // private readonly rebrickableKey: string = process.env.REBRICKABLE_KEY;
  private readonly rebrickableKey: string = "9fb8e2fe27824be982cb60651c5e44c1";
  private readonly logger = new Logger(RebrickableService.name);
  private readonly baseUrl: string =
    'https://rebrickable.com/api/v3/lego/sets/';
  private readonly themeId: string = '324';

  private readonly rebrickableAuthorizationKey = {
    Authorization: `key ${this.rebrickableKey}`,
  };

  constructor(private readonly httpService: HttpService) {}

  private async getFirstValueFrom(
    headers: { Authorization: string },
    ...urlPath: string[]
  ): Promise<{ data: any }> {
    return await firstValueFrom(
      this.httpService
        .get<any>(this.baseUrl + urlPath.join(''), { headers })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
  }

  async getPiecesBySetIdNumber(setId: string): Promise<any> {
    const { data } = await this.getFirstValueFrom(
      this.rebrickableAuthorizationKey,
      `${setId}/parts/`,
    );

    return data.results.map((bionicle) => ({
      part_num: bionicle.part.part_num,
      part_img_url: bionicle.part.part_img_url,
      quantity: bionicle.quantity,
    }));
  }

  async findAll(maxYear: string): Promise<any> {
    const { data } = await this.getFirstValueFrom(
      this.rebrickableAuthorizationKey,
      `?theme_id=${this.themeId}&min_year=${maxYear}&max_year=${maxYear}`,
    );
    const maxCharactersForSetNum = 7;
    return data.results
      .filter((bionicle) => bionicle.set_num.length <= maxCharactersForSetNum)
      .filter(
        (bionicle) =>
          !/(kit|pack|value|BIONICLE|Nestlé|collection|give|away|QUICK|chamber|launcher|battle|gift|500|good|bad|function|catapult)/i.test(
            bionicle.name,
          ),
      )
      .filter((bionicle) => !/^K/i.test(bionicle.set_num))
      .map((bionicle) => ({
        set_num: bionicle.set_num,
        name: bionicle.name
          .replace(/ *\([^)]*\) */g, '')
          .replace(/ *\[[^\]]*\] */g, ''), // Remove any text in parentheses and brackets,
        year: bionicle.year,
        set_img_url: bionicle.set_img_url,
      }));
  }

  async findOne(id: string, year: string): Promise<any> {
    const allSets = await this.findAll(year);
    return allSets.find((set) => set.set_num === id) || null;
  }
}

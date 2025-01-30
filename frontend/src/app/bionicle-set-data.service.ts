import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISetData } from './set-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BionicleSetDataService {
  private _apiUrl: string = 'http://localhost:3000/bionicles';
  protected setDataList: ISetData[] = [];


  constructor(private http: HttpClient) {}

  fetchBionicleData<T>(path?: string, ...queryParams: string[]) {
    console.log('fetchBionicleData method triggered...');
    const request = `${this._apiUrl}${path}${queryParams}`;
    console.log(request);
    return this.http.get<T>(request);
  }

  getAllBionicleDataByYear(year: string): Observable<ISetData[]> {
    return this.fetchBionicleData<ISetData[]>(`?year=${year}`);
  }

  getBionicleDataById(id: string): Observable<ISetData> {
    return this.fetchBionicleData<ISetData>('/set', `?id=${id}`);
  }
}

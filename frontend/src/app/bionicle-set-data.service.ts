import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISetData } from './set-data';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BionicleSetDataService {
  private _host: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private _fetchBionicleData<T>(path?: string, ...queryParams: string[]) {
    const request = `${this._host}${path}${queryParams}`;
    return this.http.get<T>(request);
  }

  getAllBionicleDataByYear(year: string): Observable<ISetData[]> {
    return this._fetchBionicleData<ISetData[]>(`?year=${year}`);
  }

  getBionicleDataById(id: string, year: string): Observable<ISetData> {
    return this._fetchBionicleData<ISetData>('/set', `?id=${id}&year=${year}`);
  }

  getSpecificBionicleData(q: string): Observable<ISetData[]> {
    return this._fetchBionicleData<ISetData[]>('/search', `?q=${q}`);
  }
}

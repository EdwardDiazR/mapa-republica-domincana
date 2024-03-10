import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province, ProvinceApiResponse } from '../interfaces/province';
import { MunicipioApiResponse } from '../interfaces/municipalities';
import { DistrictResponseApi } from '../interfaces/district';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  apiBaseUrl: string = 'https://api.digital.gob.do/v1/territories';
  constructor(private _http: HttpClient) {}

  getAllProvinces(): Observable<ProvinceApiResponse> {
    return this._http.get<ProvinceApiResponse>(`${this.apiBaseUrl}/provinces`);
  }

  obtenerMunicipiosPorProvincia(
    provinceCode: string,
    provRegCode: string
  ): Observable<MunicipioApiResponse> {
    return this._http.get<MunicipioApiResponse>(
      `${this.apiBaseUrl}/municipalities?provinceCode=${provinceCode}&regionCode=${provRegCode}`
    );
  }

  obtenerDistritos(
    municipalitieCode: string,
    provinceCode: string
  ): Observable<DistrictResponseApi> {
    return this._http.get<DistrictResponseApi>(
      `${this.apiBaseUrl}/districts?municipalityCode=${municipalitieCode}&provinceCode=${provinceCode}`
    );
  }
}

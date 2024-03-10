import { Component, OnInit, ElementRef } from '@angular/core';
import { ProvinceService } from '../../services/province.service';
import { Province } from '../../interfaces/province';
import { Municipalities } from '../../interfaces/municipalities';
import { NgClass } from '@angular/common';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { empty, map } from 'rxjs';
import { District } from '../../interfaces/district';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NgClass, LoadingSpinnerComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  provinces!: Province[];
  selectedProvince!: Province;
  selectedMunicipalitie!: Municipalities | null;

  provinceMunicipalities!: Municipalities[];
  municipalitieDistricts!: District[] | null;

  loadingProvinces: boolean = false;
  loadingMunicipalities: boolean = false;
  loadingDistricts:boolean= false;

  constructor(
    private _proviceService: ProvinceService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // this.loadProvinces();
  }

  selectProvinceByMap(provinceName: string) {
    if (!this.provinces) {
      this.loadProvinces();
    }
    if (this.provinces) {
      const result = this.provinces.find((p) => p.name === provinceName);
      console.log(result);
      if (result) {
        this.selectedProvince = result;
        this.getMunicipalities(
          this.selectedProvince.code,
          this.selectedProvince.regionCode
        );
      }
    }
  }

  loadProvinces() {
    //Verificamos que la lista de provincias este vacia, para no hacer llamadas inncecesarias a la API
    if (!this.provinces) {
      this.loadingProvinces = true;
      this._proviceService.getAllProvinces().subscribe({
        next: (res) => {
          this.provinces = res.data;
          this.loadingProvinces = false;
          console.log(res);
        },
      });
    }
  }

  selectProvince(province: Province) {
    if (province != this.selectedProvince) {
      this.provinceMunicipalities = [];
      this.municipalitieDistricts = null
      this.selectedProvince = province;
      this.selectedMunicipalitie = null;
      console.log(this.selectedProvince);
      this.getMunicipalities(
        this.selectedProvince.code,
        this.selectedProvince.regionCode
      );
    }
  }

  //Method: Get municipalities 
  getMunicipalities(codigoProvincia: string, codigoRegion: string) {
    this.loadingMunicipalities = true;
    this._proviceService
      .obtenerMunicipiosPorProvincia(codigoProvincia, codigoRegion)
      .pipe(
        map((response: any) => {
          if (Array.isArray(response.data)) {
            return response.data;
          } else {
            return [response.data];
          }
        })
      )
      .subscribe({
        next: (res) => {
          this.provinceMunicipalities = res;
          this.loadingMunicipalities = false;
        },
      });
  }

  getDistricts(municipalitieCode: string, provinceCode: string) {
    this.loadingDistricts = true
    this._proviceService
      .obtenerDistritos(municipalitieCode, provinceCode)
      .pipe(
        map((response: any) => {
          if (Array.isArray(response.data)) {
            return response.data;
          } else {
            return [response.data];
          }
        })
      )
      .subscribe({
        next: (res) => {
          
          this.municipalitieDistricts = res;
          this.loadingDistricts = false;
        },
      });
  }
}

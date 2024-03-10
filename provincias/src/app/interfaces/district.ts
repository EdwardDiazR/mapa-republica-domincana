export interface DistrictResponseApi{
    valid:boolean;
    data: District[] 
}

export interface District {
    name:string;
    code:string;
    identifier:string;
    municipalityCode:string;
    provinceCode:string;
    regionCode:string;

}

export interface MunicipioApiResponse{
    valid:boolean;
    data:Municipalities[]
}

export interface Municipalities {
    name:string;
    code:string;
    identifier:string;
    provinceCode:string;
    regionCode:string;
}

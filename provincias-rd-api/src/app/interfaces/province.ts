interface ProvinceApiResponse{
    date:boolean
    data:Province[]
}

 interface Province {
  name: string;
  code: string;
  identifier: string;
  regionCode: string;
}

export {ProvinceApiResponse,Province}

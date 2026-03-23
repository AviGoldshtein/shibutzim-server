export class ItemDto {
  name: string;
  quantity: number;
  unitCost: number;
}

export class ResourceDto {
  categoryName: string;
  items: ItemDto[];
}

export class ShibutzDto {
  title: string;
  codeShibutz: string;
  directCost: number;
  costOfItems: number;
  mesima: string;
  serviceType: string;
  variationPastYear: number;
  dateBegin: string;
  dateEnd: string;
  resources: ResourceDto[];
}

export class GdudDto {
  name: string;
  forceType: string;
  pikud: string;
  shibutsim: ShibutzDto[];
}

export class DataResponseDto {
  unit: string;
  period: {
    start: string;
    end: string;
  };
  gdudim: GdudDto[];
}
import { BaseSite } from '@/entity/Site/interface';
import { SiteType } from '@/typings';

export interface queryDTO {
  siteType: SiteType;
  page?: number;
  pageSize?: number;
  sortType?: string;
  filterType?;
  string;
}

export interface querySiteInfoDTO {
  siteType: SiteType;
  siteId: string;
}

export default interface SiteServiceImpl {
  querySites: (arg: queryDTO) => Promise<BaseSite[]>;
  querySite: (arg: querySiteInfoDTO) => Promise<BaseSite>;
}

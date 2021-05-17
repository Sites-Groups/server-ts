import { BizError, ErrorCodeEnum } from '@/common';
import BasicSiteDTO from '@/entity/Site/BasicSiteDTO';
import { BaseSite } from '@/entity/Site/interface';
import TechnologySIteDTO, { TechnologySiteDTO } from '@/entity/Site/TechnologySIteDTO';
import { ReturnModelType } from '@typegoose/typegoose';
import { QueryMethodMap } from '@typegoose/typegoose/lib/types';
import SiteServiceImpl, { queryDTO, querySiteInfoDTO } from './SiteServiceImpl';

const MAP_SITE_DTO = {
  technology: TechnologySIteDTO,
};

export default class SiteService implements SiteServiceImpl {
  /**
   * 查询站点列表
   * @param queryDto
   */
  public async querySites(queryDto: queryDTO): Promise<BaseSite[]> {
    const { filterType, siteType, sortType } = queryDto;
    if (!MAP_SITE_DTO[siteType]) {
      throw new BizError('不存在的站点类型');
    }
    const { page = 1, pageSize = 12 } = queryDto;
    const queryFilterKey = filterType === 'submitDate' ? '_id' : filterType;
    const sortTypeArg = {
      [queryFilterKey]: sortType === 'up' ? -1 : 1,
    };
    const sitesList = await MAP_SITE_DTO[queryDto.siteType]
      .find(
        { siteVerify: true },
        {
          siteId: 1,
          siteDesc: 1,
          siteName: 1,
          siteType: 1,
          siteLink: 1,
          siteIcon: 1,
          submitDate: 1,
          siteVerify: 1,
          userId: 1,
          rss: 1,
          hot: 1,
          siteImgs: 1,
        },
      )
      .sort(sortTypeArg)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return sitesList;
  }

  public async querySite(querySiteDto: querySiteInfoDTO): Promise<BaseSite> {
    const { siteType, siteId } = querySiteDto;
    if (!MAP_SITE_DTO[siteType]) {
      throw new BizError('不存在的站点类型');
    }
    const TargetSite: ReturnModelType<TechnologySiteDTO, Record<string, any>> =
      MAP_SITE_DTO[siteType];
    const site = await TargetSite.findOne({ siteId });
    if (!site) {
      throw new BizError('站点不存在', ErrorCodeEnum.NOT_FOUND);
    }
    return site;
  }
}

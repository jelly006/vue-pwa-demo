import http from '../http';

import { IQuote, IQuoteLookup } from '@/types';

export interface ICommonService {
  getLookupAppList(id: number| string): Promise<IQuoteLookup<[]>>;
  getTopAppList(): Promise<IQuote[]>;
  getFreeAppList(limit: number): Promise<IQuote[]>;
}

export class CommonService implements ICommonService {
  public async getLookupAppList(id: number| string): Promise<IQuoteLookup<[]>> {
    const {
      results: results
    }  = await http({
      method: 'get',
      url: `hk/lookup?id=${id}`,
      data: {}
    });

    return results;
  }
  public async getTopAppList(): Promise<IQuote[]> {
    const {
      feed: feed
    } = await http({
      method: 'get',
      url: 'hk/rss/topgrossingapplications/limit=10/json',
      data: {}
    });

    return feed;
  }
  public async getFreeAppList(limit: number): Promise<IQuote[]> {
    const {
      feed: feed
    } = await http({
      method: 'get',
      url: `hk/rss/topfreeapplications/limit=${limit}/json`,
      data: {}
    });

    return feed;
  }
}

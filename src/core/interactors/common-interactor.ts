import { CommonService, ICommonService } from '../services/common/request';

class CommonInteractor {
  public static getInstance() {
    return this._instance;
  }

  private static _instance = new CommonInteractor(new CommonService());

  private _quotes: any;
  private _quotesFreeApp: any;
  private _quotesLookup: any;

  constructor(private _service: ICommonService) { }

  public async getTopAppList() {
    // 单例模式下，将一些基本固定不变的接口数据保存在内存中，避免重复调用
    // 但要注意避免内存泄漏
    // if (this._quotes !== undefined) {
    //   return this._quotes;
    // }

    const response = await this._service.getTopAppList();
    // try {
    //   response = await this._service.getTopAppList();
    // } catch (error) {
    //   throw error;
    // }

    this._quotes = response;
    return this._quotes;
  }

  public async getFreeAppList(limit: number) {
    // 单例模式下，将一些基本固定不变的接口数据保存在内存中，避免重复调用
    // 但要注意避免内存泄漏
    // if (this._quotes !== undefined) {
    //   return this._quotes;
    // }

    const response = await this._service.getFreeAppList(limit);
    // try {
    //   response = await this._service.getFreeAppList(limit);
    // } catch (error) {
    //   throw error;
    // }

    this._quotesFreeApp = response;
    return this._quotesFreeApp;
  }

  public async getLookupAppList(id: number|string) {
    // 单例模式下，将一些基本固定不变的接口数据保存在内存中，避免重复调用
    // 但要注意避免内存泄漏
    // if (this._quotes !== undefined) {
    //   return this._quotes;
    // }

    const response = await this._service.getLookupAppList(id);
    // try {
    //   response = await this._service.getLookupAppList(id);
    // } catch (error) {
    //   throw error;
    // }
    this._quotesLookup = response;
    return this._quotesLookup;
  }
}







export default CommonInteractor.getInstance();

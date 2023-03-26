export interface IQuote {
  feed: object;
}
              
export interface IQuoteLookup<T> {
  resultCount: number;
  results: T
}
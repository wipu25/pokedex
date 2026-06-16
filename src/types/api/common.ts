export type UrlData = { name: string; url: string };

export type Type = UrlData;

export interface ListResponse<T = UrlData> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

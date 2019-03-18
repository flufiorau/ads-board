export interface Ad {
  id?: number;
  title: string;
  description: string;
  author?: string;
  createdDate?: number;
}

export interface Page {
  ads: Array<Ad>;
}

export interface AdsDataSource {
  content: Array<Page>;
  first: boolean;
  last: boolean;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
}


export type WorkList = {
  slug: string;
  name: string;
};

export type WorkListResponse = WorkList[];

export const getWorkList = async (): Promise<WorkListResponse> =>
  fetch('https://dummyjson.com/products/categories').then((res) => res.json());

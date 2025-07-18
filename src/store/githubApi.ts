import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Repository } from '../types/repository';

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

interface SearchRepositoriesParams {
  query: string;
  page?: number;
}

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  endpoints: (builder) => ({
    searchRepositories: builder.query<SearchResponse, SearchRepositoriesParams>({
      query: ({ query = '', page = 1 }) => {
        const params = new URLSearchParams({
          q: query,
          per_page: '10',
          page: page.toString(),
        });

        return `/search/repositories?${params}`;
      },
    }),
    getRepository: builder.query<Repository, string>({
      query: (fullName) => `/repos/${fullName}`,
    }),
  }),
});

export const { useSearchRepositoriesQuery, useGetRepositoryQuery } = githubApi;
export default githubApi;

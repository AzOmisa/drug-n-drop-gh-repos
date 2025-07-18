import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  language: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  created_at: string;
  license: {
    name: string;
    spdx_id: string;
  } | null;
  homepage: string | null;
  forks_count: number;
}

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

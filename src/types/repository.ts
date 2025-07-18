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

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { Repository } from '../types/repository';

interface RepoState {
  repositories: Repository[];
  favorites: Repository[];
  searchQuery: string;
  currentPage: number;
  totalCount: number;
  sortBy: 'stars' | 'name';
  sortOrder: 'asc' | 'desc';
  textFilter: string;
}

const repoSlice = createSlice({
  name: 'repositories',
  initialState: {
    repositories: [],
    favorites: [],
    searchQuery: '',
    currentPage: 1,
    totalCount: 0,
    sortBy: 'stars',
    sortOrder: 'desc',
    textFilter: '',
  } as RepoState,
  reducers: {
    setRepositories: (
      state,
      action: PayloadAction<{ items: Repository[]; total_count?: number }>,
    ) => {
      state.repositories = action.payload.items;
      state.totalCount = action.payload.total_count || 0;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setTextFilter: (state, action) => {
      state.textFilter = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<{ repo: Repository; insertIndex?: number }>) => {
      const { repo, insertIndex } = action.payload;
      state.repositories = state.repositories.filter((r: Repository) => r.id !== repo.id);
      if (!state.favorites.find((fav: Repository) => fav.id === repo.id)) {
        if (typeof insertIndex === 'number') {
          state.favorites.splice(insertIndex, 0, repo);
        } else {
          state.favorites.push(repo);
        }
      }
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<{ repoId: number; insertIndex?: number }>,
    ) => {
      const { repoId, insertIndex } = action.payload;

      const repoIndex = state.favorites.findIndex((fav) => fav.id === repoId);
      if (repoIndex === -1) return;

      const [removedRepo] = state.favorites.splice(repoIndex, 1);

      if (typeof insertIndex === 'number') {
        state.repositories.splice(insertIndex, 0, removedRepo);
      } else {
        state.repositories.push(removedRepo);
      }
    },
    reorderFavorites: (
      state,
      action: PayloadAction<{ sourceIndex: number; destIndex: number }>,
    ) => {
      const { sourceIndex, destIndex } = action.payload;
      const updated = [...state.favorites];
      const [moved] = updated.splice(sourceIndex, 1);
      updated.splice(destIndex, 0, moved);
      state.favorites = updated;
    },
    reorderRepositories: (
      state,
      action: PayloadAction<{ sourceIndex: number; destIndex: number }>,
    ) => {
      const { sourceIndex, destIndex } = action.payload;
      const updated = [...state.repositories];
      const [moved] = updated.splice(sourceIndex, 1);
      updated.splice(destIndex, 0, moved);
      state.repositories = updated;
    },
  },
});

export default repoSlice.reducer;
export const {
  reorderFavorites,
  setRepositories,
  setSearchQuery,
  setCurrentPage,
  setSortBy,
  setSortOrder,
  setTextFilter,
  addToFavorites,
  removeFromFavorites,
  reorderRepositories,
} = repoSlice.actions;

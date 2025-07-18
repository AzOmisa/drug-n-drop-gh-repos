
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { Card, Spin, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorState } from './components/ErrorState';
import { FavoritesComponent } from './components/Favorites';
import { RepositoryList } from './components/RepositoryList';
import { SearchComponent } from './components/SearchComponent';
import { useSearchRepositoriesQuery } from './store/githubApi';
import {
  addToFavorites,
  removeFromFavorites,
  reorderFavorites,
  reorderRepositories,
  setRepositories,
} from './store/repositoriesSlice';
import { type RootState, store } from './store/store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, searchQuery } = useSelector((state: RootState) => state.repositories);

  const { data, isFetching, isError, refetch, isSuccess } = useSearchRepositoriesQuery(
    {
      query: searchQuery,
      page: currentPage,
    },
    { skip: !searchQuery },
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRepositories({ items: data.items || [], total_count: data.total_count }));
    }
  }, [data, dispatch, isSuccess]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const state = store.getState().repositories;

    if (source.droppableId === 'favorites-list' && destination.droppableId === 'favorites-list') {
      if (source.index !== destination.index) {
        dispatch(
          reorderFavorites({
            sourceIndex: source.index,
            destIndex: destination.index,
          }),
        );
      }
      return;
    }

    if (source.droppableId === 'repository-list' && destination.droppableId === 'repository-list') {
      if (source.index !== destination.index) {
        dispatch(
          reorderRepositories({
            sourceIndex: source.index,
            destIndex: destination.index,
          }),
        );
      }
      return;
    }

    if (source.droppableId === 'repository-list' && destination.droppableId === 'favorites-list') {
      const repo = state.repositories.find((repo) => repo.id.toString() === draggableId);
      if (repo) {
        dispatch(addToFavorites({ repo, insertIndex: destination.index }));
      }
      return;
    }

    if (source.droppableId === 'favorites-list' && destination.droppableId === 'repository-list') {
      const repo = state.favorites.find((repo) => repo.id.toString() === draggableId);
      if (repo) {
        dispatch(
          removeFromFavorites({
            repoId: repo.id,
            insertIndex: destination.index ?? state.repositories.length, // fallback
          }),
        );
      }
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <Typography.Title className="text-center mb-6">
          Менеджер репозиториев Github
        </Typography.Title>

        <SearchComponent loading={isFetching} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card
              title="Репозитории"
              className="h-[70dvh]"
              classNames={{
                body: 'w-full h-[calc(100%_-_60px)] p-2 flex flex-col items-center justify-center',
              }}
            >
              {isFetching ? (
                <Spin size="large" />
              ) : isError ? (
                <ErrorState onRetry={refetch} />
              ) : (
                <RepositoryList />
              )}
            </Card>

            <Card
              title="Избранное"
              className="h-[70dvh]"
              classNames={{ body: 'h-[calc(100%_-_60px)] p-2' }}
            >
              <FavoritesComponent />
            </Card>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;

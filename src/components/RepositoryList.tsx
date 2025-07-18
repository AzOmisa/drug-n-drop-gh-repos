
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Pagination } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EmptyState from './EmptyState';
import { Filters } from './Filters';
import { RepositoryCard } from './RepositoryCard';
import { setCurrentPage } from '../store/repositoriesSlice';
import type { RootState } from '../store/store';

export const RepositoryList: React.FC = () => {
  const dispatch = useDispatch();
  const { repositories, currentPage, totalCount, sortBy, sortOrder, textFilter, favorites } =
    useSelector((state: RootState) => state.repositories);

  const filteredAndSortedRepos = React.useMemo(() => {
    const filtered = repositories.filter(
      (repo) =>
        (repo.name.toLowerCase().includes(textFilter.toLowerCase()) ||
          repo.full_name.toLowerCase().includes(textFilter.toLowerCase())) &&
        !favorites.some((fav) => fav.id === repo.id),
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'stars') {
        return sortOrder === 'desc'
          ? b.stargazers_count - a.stargazers_count
          : a.stargazers_count - b.stargazers_count;
      } else {
        return sortOrder === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      }
    });
  }, [favorites, repositories, sortBy, sortOrder, textFilter]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="h-full flex flex-col w-full">
      <Filters />

      <div className="flex-1 overflow-y-auto mb-4">
        {!totalCount ? (
          <EmptyState />
        ) : (
          <Droppable droppableId="repository-list" type="REPO">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {filteredAndSortedRepos.map((repo, index) => (
                  <Draggable key={repo.id} draggableId={repo.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <RepositoryCard repo={repo} isDragging={snapshot.isDragging} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </div>

      {totalCount > 0 && (
        <div className="mt-auto">
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={10}
            onChange={handlePageChange}
            showSizeChanger={false}
            simple
            showTotal={(total, range) => `${range[0]}-${range[1]} из ${total}`}
          />
        </div>
      )}
    </div>
  );
};

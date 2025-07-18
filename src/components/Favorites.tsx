
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Typography } from 'antd';
import { Heart } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

import { RepositoryCard } from './RepositoryCard';
import type { RootState } from '../store/store';
import { type Repository } from '../types/repository';

export const FavoritesComponent: React.FC = () => {
  const { favorites } = useSelector((state: RootState) => state.repositories);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <Droppable droppableId="favorites-list" type="REPO">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`p-2 rounded-lg transition-colors ${
              snapshot.isDraggingOver
                ? 'bg-blue-50 border-2 border-blue-300 border-dashed'
                : 'bg-gray-50'
            }`}
          >
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center text-center text-gray-500 py-8">
                <Heart className="text-4xl mb-2" />
                <Typography.Text>Перетащите репозитории сюда</Typography.Text>
              </div>
            ) : (
              favorites.map((repo: Repository, index: number) => (
                <Draggable key={repo.id} draggableId={repo.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <RepositoryCard
                        repo={repo}
                        isDragging={snapshot.isDragging}
                        isFavorite={true}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

import { Badge, Button, Card, Typography } from 'antd';
import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RepositoryModal } from './RepositoryModal';
import type { Repository } from '../store/githubApi';
import { addToFavorites, removeFromFavorites } from '../store/repositoriesSlice';
import type { RootState } from '../store/store';

export const RepositoryCard: React.FC<{
  repo: Repository;
  isDragging?: boolean;
  isFavorite?: boolean;
}> = ({ repo, isDragging = false, isFavorite = false }) => {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.repositories.favorites);
  const isInFavorites = favorites.some((fav) => fav.id === repo.id);

  const handleAddToFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInFavorites) {
      dispatch(addToFavorites({ repo }));
    }
  };

  const handleRemoveFromFavorites = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFromFavorites({ repoId: repo.id }));
  };

  return (
    <>
      <Card
        className={`mb-3 cursor-pointer transition-all duration-200 hover:shadow-lg ${
          isDragging ? 'rotate-2 shadow-xl' : ''
        }`}
        size="small"
        actions={[
          <div key="stats" className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" />
              <Typography.Text className="text-sm">{repo.stargazers_count}</Typography.Text>
            </div>
            {isFavorite ? (
              <Button
                type="text"
                size="small"
                danger
                onClick={handleRemoveFromFavorites}
                icon={<Heart />}
              />
            ) : (
              <Button
                type="text"
                size="small"
                onClick={handleAddToFavorites}
                disabled={isInFavorites}
                icon={<Heart className={isInFavorites ? 'text-red-500' : ''} />}
              />
            )}
          </div>,
        ]}
        onClick={() => setOpened(true)}
      >
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Typography.Text className="text-blue-600">{repo.name}</Typography.Text>
              {repo.language && (
                <Badge count={repo.language} style={{ backgroundColor: '#52c41a' }} />
              )}
            </div>
            <Typography.Text className="text-xs text-gray-600 block mb-2">
              {repo.full_name}
            </Typography.Text>
            {repo.description && (
              <Typography.Text className="text-sm text-gray-700 block">
                {repo.description}
              </Typography.Text>
            )}
          </div>
        </div>
      </Card>
      <RepositoryModal opened={opened} onClose={() => setOpened(false)} repo={repo} />
    </>
  );
};

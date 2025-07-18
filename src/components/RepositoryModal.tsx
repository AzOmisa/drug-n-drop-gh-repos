import { Avatar, Descriptions, Flex, Modal, Spin, Typography } from 'antd';
import Link from 'antd/es/typography/Link';
import { Calendar, ExternalLink, GitFork, Star } from 'lucide-react';

import { useGetRepositoryQuery } from '../store/githubApi';
import type { Repository } from '../types/repository';

interface RepositoryModalProps {
  repo: Repository;
  onClose: () => void;
  opened: boolean;
}

export const RepositoryModal: React.FC<RepositoryModalProps> = ({ repo, onClose, opened }) => {
  const { data: repoDetails, isLoading } = useGetRepositoryQuery(repo.full_name, {
    skip: !opened || Boolean(repo.id),
  });
  const displayRepo = repoDetails || repo;

  if (!repo || !opened) return null;

  return (
    <Modal
      footer={null}
      centered
      open={opened}
      onCancel={onClose}
      className="max-w-2xl  max-h-[90vh] inset-0 flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto animate-slideIn z-1"
    >
      <Typography.Title className="font-bold text-gray-800">{repo.name}</Typography.Title>

      <div className="flex flex-col gap-4 min-h-32 justify-center">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <Flex className="gap-4 items-center">
              <Flex className="items-center gap-2 text-yellow-500">
                <Star className="w-5 h-5" />
                <Typography.Text className="mb-0">{displayRepo.stargazers_count}</Typography.Text>
              </Flex>
              <Flex className="items-center gap-2 text-gray-600">
                <GitFork className="w-5 h-5" />
                <Typography.Text className="mb-0">{displayRepo.forks_count}</Typography.Text>
              </Flex>
              <Flex className="items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <Typography.Text className="mb-0">
                  {new Date(displayRepo.created_at).toLocaleDateString()}
                </Typography.Text>
              </Flex>
            </Flex>

            <Flex className="gap-2 items-center">
              <Avatar src={displayRepo.owner.avatar_url} alt={displayRepo.owner.login} />
              <Typography.Text className="font-semibold text-gray-800">
                {displayRepo.owner.login}
              </Typography.Text>
              <Link
                href={displayRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Flex>

            <Descriptions column={1}>
              <Descriptions.Item
                className="[&.ant-descriptions-item-container]:flex-col "
                label="Описание"
              >
                {displayRepo.description || 'No description available'}
              </Descriptions.Item>
              {displayRepo.language && (
                <Descriptions.Item label="Язык">{displayRepo.language}</Descriptions.Item>
              )}
              {displayRepo.license && (
                <Descriptions.Item label="Лицензия" span="filled">
                  {displayRepo.license.name}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Последнее обновление">
                {new Date(displayRepo.updated_at).toLocaleDateString()}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </div>
    </Modal>
  );
};

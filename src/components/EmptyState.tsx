import { Result } from 'antd';

interface EmptyStateProps {
  isUninitialized?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isUninitialized }) => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <Result
        status={isUninitialized ? 'info' : '404'}
        title={isUninitialized ? 'Добро пожаловать' : 'Ничего не найдено'}
        subTitle={
          isUninitialized
            ? 'Введите название репозитория'
            : 'Репозитории по вашему запросу не найдены.'
        }
        icon={isUninitialized ? null : undefined}
      />
    </div>
  );
};

export default EmptyState;

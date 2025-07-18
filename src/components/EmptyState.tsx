import { Result } from 'antd';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <Result
        status="404"
        title="Ничего не найдено"
        subTitle={message || 'Репозитории по вашему запросу не найдены.'}
      />
    </div>
  );
};

export default EmptyState;

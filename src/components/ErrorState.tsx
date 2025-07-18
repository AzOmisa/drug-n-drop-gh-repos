import { Button, Result } from 'antd';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <Result
      status="error"
      title="Произошла ошибка"
      subTitle={message || 'Не удалось загрузить данные. Попробуйте ещё раз.'}
      extra={
        onRetry && (
          <Button type="primary" onClick={onRetry}>
            Повторить попытку
          </Button>
        )
      }
    />
  );
};

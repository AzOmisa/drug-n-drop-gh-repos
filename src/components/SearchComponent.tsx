
import { Button, Input, Space } from 'antd';
import { Search } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSearchQuery } from '../store/repositoriesSlice';

interface SearchComponentProps {
  loading?: boolean;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({ loading }) => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (value) {
      dispatch(setSearchQuery(value.trim()));
    }
  };

  return (
    <div className="mb-6">
      <Space.Compact style={{ width: '100%' }}>
        <Input
          placeholder="Поиск репозиториев..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={handleSearch}
          size="large"
        />
        <Button
          type="primary"
          size="large"
          onClick={handleSearch}
          loading={loading}
          icon={<Search />}
        >
          Найти
        </Button>
      </Space.Compact>
    </div>
  );
};

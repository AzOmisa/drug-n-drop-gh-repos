import { Input, Select } from 'antd';
import { Filter } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { setSortBy, setSortOrder, setTextFilter } from '../store/repositoriesSlice';
import type { RootState } from '../store/store';

export const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { sortBy, sortOrder, textFilter } = useSelector((state: RootState) => state.repositories);

  const handleSortChange = (value: string) => {
    const [sortField, order] = value.split('-');
    dispatch(setSortBy(sortField as 'stars' | 'name'));
    dispatch(setSortOrder(order as 'asc' | 'desc'));
  };

  return (
    <div className="mb-4 space-y-3">
      <div className="flex gap-2">
        <Select
          value={`${sortBy}-${sortOrder}`}
          onChange={handleSortChange}
          style={{ width: 160 }}
          size="small"
        >
          <Select.Option value="stars-desc">Звезды ↓</Select.Option>
          <Select.Option value="stars-asc">Звезды ↑</Select.Option>
          <Select.Option value="name-asc">Имя ↑</Select.Option>
          <Select.Option value="name-desc">Имя ↓</Select.Option>
        </Select>
      </div>

      <Input
        placeholder="Фильтр по названию..."
        value={textFilter}
        onChange={(e) => dispatch(setTextFilter(e.target.value))}
        prefix={<Filter />}
        size="small"
      />
    </div>
  );
};

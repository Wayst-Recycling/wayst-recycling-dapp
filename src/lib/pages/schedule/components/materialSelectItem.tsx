import { Check } from 'lucide-react';

import { cn } from '@/lib/styles/utils';
import {
  PICKUP_MATERIAL,
  SCHEDULE_REDUCER_PATH,
} from '@/store/constants/schedule';
import { useAppSelector } from '@/store/store';

const MaterialSelectItem = ({
  material,
}: {
  material: {
    label: string;
    value: string;
    backgroundColor: string;
    image: string;
    active: boolean;
  };
}) => {
  const { [PICKUP_MATERIAL]: pickupMaterial } = useAppSelector(
    (state) => state[SCHEDULE_REDUCER_PATH]
  );

  return (
    <div
      className={cn(
        'flex min-w-max items-center space-x-2 rounded-full p-2 pr-4',
        !material.active && 'opacity-40'
      )}
      style={{ backgroundColor: material.backgroundColor }}
    >
      <img
        src={material.image}
        className="aspect-square w-8"
        alt={material.value}
      />
      <p>{material.label}</p>
      {pickupMaterial === material.value && <Check />}
    </div>
  );
};

export default MaterialSelectItem;

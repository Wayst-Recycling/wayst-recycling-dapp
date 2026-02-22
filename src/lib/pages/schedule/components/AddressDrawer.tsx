import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import Button from '@/lib/components/buttons/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/lib/components/ui/command';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/lib/components/ui/drawer';
import { autocompleteWithLatLng } from '@/lib/utils/google-maps';
import logger from '@/lib/utils/logger';

import { useCreateAddress } from './useCreateAddress';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const AddressDrawer = ({ isOpen, onClose }: Props) => {
  const { formik, isLoading, getSelectProps } = useCreateAddress({ onClose });

  const [predictions, setPredictions] = useState<
    {
      description: string;
      place_id: string;
      lat: number | null;
      lng: number | null;
      streetAddress?: string;
      city?: string;
      state?: string;
      region?: string;
    }[]
  >([]);

  const fetchPredictions = useDebouncedCallback(async (query: string) => {
    if (!query.trim()) {
      setPredictions([]);
      return;
    }
    try {
      const results = await autocompleteWithLatLng(query);
      setPredictions(results || []);
    } catch (error) {
      logger(error);
    }
  }, 300);
  const locationInputProps = getSelectProps('description');

  const handleInputChange = (value: string) => {
    locationInputProps.setValue(value);
    fetchPredictions(value);
  };

  const handleSelectLocation = useCallback(
    (location: {
      description: string;
      place_id: string;
      lat: number | null;
      lng: number | null;
      streetAddress?: string;
      city?: string;
      state?: string;
      region?: string;
      streetNumber?: string;
    }) => {
      const { lat, lng, city, region, state, streetAddress, description } =
        location;

      formik.setFieldValue('description', description || '');
      formik.setFieldValue('address', streetAddress || '');
      formik.setFieldValue('region', region || '');
      formik.setFieldValue('city', city || '');
      formik.setFieldValue('state', state || '');
      formik.setFieldValue('long', lng?.toString() || '');
      formik.setFieldValue('lat', lat?.toString() || '');

      setPredictions([]);
    },
    [formik]
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="px-5">
        <DrawerHeader>
          <DrawerTitle className="text-start">Add Pickup Address</DrawerTitle>
        </DrawerHeader>

        <form className="pb-96" onSubmit={formik.handleSubmit}>
          <Command className="p-1">
            <CommandInput
              id="place"
              className=""
              placeholder="Search for locations"
              onValueChange={handleInputChange}
              value={locationInputProps.value}
            />
            <CommandList>
              {predictions.length > 0 && (
                <CommandGroup
                  heading="Suggestions"
                  className="rounded-xl border"
                >
                  {predictions.map((prediction) => (
                    <CommandItem
                      key={prediction.place_id}
                      className="border-b py-2"
                      onSelect={() => handleSelectLocation(prediction)}
                    >
                      {prediction.description}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
          <Button type="submit" isLoading={isLoading} className="mt-4 w-full">
            Add Address
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default AddressDrawer;

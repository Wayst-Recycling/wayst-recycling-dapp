import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

import { useGetDropoffLocations, useScheduleDropoff } from '@/api/schedule';
import Button from '@/lib/components/buttons/button';
import { emitCommingSoonToast } from '@/lib/components/comingSoonToast';
import Input from '@/lib/components/input/input';
import InputLabel from '@/lib/components/input/inputLabel';
import Select from '@/lib/components/input/select';
import { formatAmount, removeNonDigit } from '@/lib/utils/format';
import {
  PICKUP_MATERIAL,
  SCHEDULE_REDUCER_PATH,
} from '@/store/constants/schedule';
import { setPickupMaterial } from '@/store/slices/schedule';
import { useAppDispatch, useAppSelector } from '@/store/store';

import MaterialSelectItem from './components/materialSelectItem';
import {
  PICKUP_ADDRESS_KEY,
  PICKUP_CONTAINER_AMOUNT_KEY,
  PICKUP_COUNTRY_CODE_KEY,
  PICKUP_DATE_KEY,
  PICKUP_MATERIAL_AMOUNT_KEY,
  PICKUP_MATERIAL_KEY,
  PICKUP_PHONE_KEY,
  PICKUP_WALLET_ADDRESS_KEY,
  pickupInitialValues,
  pickupValidationSchema,
} from './utils/constants';
import type { MaterialCategory } from './utils/types';

const Dropoff = () => {
  //   const handleMaterialClick = (material: string) => {
  //     setSelectedMaterial(material);
  //     setError((prev) => ({ ...prev, material: false }));
  //   };
  const { address } = useAccount();

  const [minDate, setMinDate] = useState('');
  const materials: MaterialCategory[] = [
    {
      label: 'Plastic',
      value: 'plastic',
      backgroundColor: '#FDF7DE',
      image: '/assets/plastic.svg',
      active: true,
    },
    {
      label: 'Paper',
      value: 'paper',
      backgroundColor: '#EEFAFF',
      image: '/assets/paper.svg',
      active: false,
    },
    {
      label: 'E-Waste',
      value: 'e-waste',
      backgroundColor: '#FFF1E3',
      image: '/assets/e-waste.svg',
      active: false,
    },
    {
      label: 'Organic',
      value: 'organic',
      backgroundColor: '#FFEBE9',
      image: '/assets/organic.svg',
      active: false,
    },
    {
      label: 'Metal',
      value: 'metal',
      backgroundColor: '#ECEAE9',
      image: '/assets/metal.svg',
      active: false,
    },
    {
      label: 'Glass',
      value: 'glass',
      backgroundColor: '#E5FFF3',
      image: '/assets/glass.svg',
      active: false,
    },
    {
      label: 'Mixed Waste',
      value: 'mixed',
      backgroundColor: '#C2FFF4',
      image: '/assets/mixed.svg',
      active: false,
    },
  ];

  const { mutate: scheduleDropoff, isPending: isLoadingScheduleDropoff } =
    useScheduleDropoff();

  const dispatch = useAppDispatch();

  const { [PICKUP_MATERIAL]: pickupMaterial } = useAppSelector(
    (state) => state[SCHEDULE_REDUCER_PATH]
  );

  const {
    data: dropoffLocationsResponse,
    isPending: isLoadingDropoffLocations,
  } = useGetDropoffLocations();

  const locations = dropoffLocationsResponse?.data.map((location) => ({
    value: location.id,
    label: `${location.address}, ${location.region}, ${location.state}`,
  }));

  const formik = useFormik({
    initialValues: pickupInitialValues,
    validationSchema: pickupValidationSchema,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        [PICKUP_MATERIAL_AMOUNT_KEY]: Number(
          removeNonDigit(values[PICKUP_MATERIAL_AMOUNT_KEY])
        ),
        [PICKUP_CONTAINER_AMOUNT_KEY]: Number(
          removeNonDigit(values[PICKUP_CONTAINER_AMOUNT_KEY])
        ),
      };
      try {
        scheduleDropoff(newValues, {
          onSuccess: (res) => {
            formik.resetForm();
            toast.success(res.message);
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (res: any) => {
            if (res.name === 'AxiosError') {
              return toast.error(res.response.data.message);
            }
            return toast.error(res.name);
          },
        });
      } catch {
        toast.error('Something went wrong');
      }
    },
  });

  function getInputProps(id: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  }

  function getSelectProps(id: keyof typeof formik.values) {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
      ...formik.getFieldHelpers(id),
    };
  }

  useEffect(() => {
    const today = new Date();

    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    const formattedNextDay = nextDay.toISOString().split('T')[0];

    setMinDate(formattedNextDay);
  }, []);

  useEffect(() => {
    formik.setFieldValue(PICKUP_WALLET_ADDRESS_KEY, address);
    formik.setFieldValue(PICKUP_MATERIAL_KEY, pickupMaterial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, pickupMaterial]);
  const navigate = useNavigate();

  return (
    <div className="mt-5 pb-32">
      <div className="flex items-center space-x-3">
        <button aria-label="back" type="button" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={20} />
        </button>
        <p className="text-xl font-semibold">Schedule Dropoff</p>
      </div>
      <p className="mt-5 text-sm font-medium">Select Category</p>
      <div className="hide-scroll mt-3 flex flex-nowrap space-x-2 overflow-x-scroll">
        {materials.map((material) => (
          <button
            aria-label={material.value}
            type="button"
            onClick={() =>
              material.active
                ? dispatch(setPickupMaterial(material.value))
                : emitCommingSoonToast()
            }
          >
            <MaterialSelectItem key={material.value} material={material} />
          </button>
        ))}
      </div>

      <div className="mt-10">
        <form
          className="flex flex-col justify-between"
          onSubmit={formik.handleSubmit}
        >
          <div className="space-y-3">
            <Input
              id={PICKUP_MATERIAL_AMOUNT_KEY}
              label="Number of Waste"
              placeholder="Minimum of 50 pieces"
              {...getInputProps(PICKUP_MATERIAL_AMOUNT_KEY)}
              value={formatAmount(
                String(formik.values[PICKUP_MATERIAL_AMOUNT_KEY])
              )}
              inputMode="numeric"
            />
            <Input
              id={PICKUP_CONTAINER_AMOUNT_KEY}
              label="Number of Bags"
              placeholder="Please indicate number of bags"
              {...getInputProps(PICKUP_CONTAINER_AMOUNT_KEY)}
              value={formatAmount(
                String(formik.values[PICKUP_CONTAINER_AMOUNT_KEY])
              )}
              inputMode="numeric"
            />
            <Select
              id={PICKUP_ADDRESS_KEY}
              label="Select dropoff location"
              placeholder="Select Location"
              {...getSelectProps(PICKUP_ADDRESS_KEY)}
              options={locations}
              isLoading={isLoadingDropoffLocations}
            />
            <div className="space-y-2">
              <InputLabel label="Contact Number" id={PICKUP_PHONE_KEY} />
              <div className="flex space-x-3">
                <div className="flex h-12 items-center space-x-1 rounded-lg border-2 border-gray-400 pl-3 pr-6">
                  <img
                    src="/assets/ng.png"
                    alt="ng"
                    className="relative aspect-square h-max w-4"
                  />
                  <p className="text-xs">
                    +{formik.values[PICKUP_COUNTRY_CODE_KEY]}
                  </p>
                </div>
                <Input
                  id={PICKUP_PHONE_KEY}
                  placeholder="800 000 0000"
                  {...getInputProps(PICKUP_PHONE_KEY)}
                  type="tel"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
          <Input
            label="Dropoff Date"
            id={PICKUP_DATE_KEY}
            placeholder="Pick a date"
            {...getInputProps(PICKUP_DATE_KEY)}
            type="date"
            min={minDate}
          />
          <Button
            isLoading={isLoadingScheduleDropoff}
            className="mt-4"
            type="submit"
          >
            Schedule Pickup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Dropoff;

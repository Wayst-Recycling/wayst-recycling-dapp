import { useFormik } from 'formik';
import { useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetDeliveryAddresses, useSchedulePickup } from '@/api/schedule';
import { useDisclosure } from '@/hooks/useDisclosure';
import Button from '@/lib/components/buttons/button';
import { emitCommingSoonToast } from '@/lib/components/comingSoonToast';
import Input from '@/lib/components/input/input';
import Select from '@/lib/components/input/select';
import { handleApiError } from '@/lib/utils/error-handler';
import { formatAmount, removeNonDigit } from '@/lib/utils/format';
import {
  PICKUP_MATERIAL,
  SCHEDULE_REDUCER_PATH,
} from '@/store/constants/schedule';
import { setPickupMaterial } from '@/store/slices/schedule';
import { useAppDispatch, useAppSelector } from '@/store/store';

import AddressDrawer from './components/AddressDrawer';
import MaterialSelectItem from './components/materialSelectItem';
import {
  PICKUP_CONTAINER_AMOUNT_KEY,
  PICKUP_MATERIAL_AMOUNT_KEY,
  PICKUP_MATERIAL_KEY,
  pickupInitialValues,
  pickupValidationSchema,
} from './utils/constants';
import type { MaterialCategory } from './utils/types';

const Pickup = () => {
  //   const handleMaterialClick = (material: string) => {
  //     setSelectedMaterial(material);
  //     setError((prev) => ({ ...prev, material: false }));
  //   };

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

  const { mutate: schedulePickup, isPending: isLoadingSchedulePickup } =
    useSchedulePickup();

  const dispatch = useAppDispatch();

  const addressDrawerProps = useDisclosure();

  const formik = useFormik({
    initialValues: pickupInitialValues,
    validationSchema: pickupValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
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
        const res = await schedulePickup(newValues);
        formik.resetForm();
        toast.success(res.message);
      } catch (err) {
        handleApiError(err, 'Something went wrong');
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

  const { data: deliveryAddresses, isPending: isLoadingDeliveryAddresses } =
    useGetDeliveryAddresses();

  const { [PICKUP_MATERIAL]: pickupMaterial } = useAppSelector(
    (state) => state[SCHEDULE_REDUCER_PATH]
  );

  useEffect(() => {
    formik.setFieldValue(PICKUP_MATERIAL_KEY, pickupMaterial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupMaterial]);

  const navigate = useNavigate();

  return (
    <div className="mt-5 pb-32">
      <div className="flex items-center space-x-3">
        <button aria-label="back" type="button" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={20} />
        </button>
        <p className="text-xl font-semibold">Schedule Pickup</p>
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
              label="Number of Plastics"
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
            <div>
              <Select
                id="pickupAddress"
                label="Location"
                placeholder="Select your location"
                isLoading={isLoadingDeliveryAddresses}
                options={deliveryAddresses?.map((add) => ({
                  label: add.address,
                  value: add.id,
                }))}
                {...getSelectProps('pickupAddress')}
              />
              <div className="mt-1 flex justify-end">
                <button
                  type="button"
                  onClick={addressDrawerProps.onOpen}
                  className="text-brand-primary text-xs font-semibold"
                >
                  Add address
                </button>
              </div>
            </div>
          </div>
          <Button
            isLoading={isLoadingSchedulePickup}
            className="mt-4"
            type="submit"
          >
            Schedule Pickup
          </Button>
        </form>
      </div>
      <AddressDrawer {...addressDrawerProps} />
    </div>
  );
};

export default Pickup;

import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { object, string } from 'yup';

export const useCreateAddress = ({ onClose }: { onClose: () => void }) => {
  //   const [createDeliveryAddress, { isLoading }] =
  //     useCreateDeliveryAddressMutation();

  const formik = useFormik({
    initialValues: {
      address: '',
      region: '',
      city: '',
      state: '',
      long: '',
      lat: '',
      description: '',
    },
    validationSchema: object().shape({
      address: string().required(''),
      region: string().required(''),
      city: string().required(''),
      state: string().required(''),
      long: string().required(''),
      lat: string().required(''),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        // await createDeliveryAddress({
        //   address: values.description,
        //   region: values.region,
        //   city: values.city,
        //   state: values.state,
        //   long: values.long.toString(),
        //   lat: values.lat.toString(),
        // }).unwrap();
        formik.resetForm();
        toast.success('Address created successfully');
        onClose();
      } catch (err) {
        // handleErrors(err);
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

  return { getInputProps, getSelectProps, formik };
};

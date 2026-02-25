import { useFormik } from 'formik';
import { useState } from 'react';
import type { Country } from 'react-phone-number-input';
import { getCountryCallingCode } from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import * as Yup from 'yup';

import { useRegisterMutation, useVerifyEmailMutation } from '@/api/auth';
import Button from '@/lib/components/buttons/button';
import Input from '@/lib/components/input/input';
import { InputPhone } from '@/lib/components/input/phone-input';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from '@/lib/components/ui/drawer';
import { setCookie } from '@/lib/utils/cookies';
import { handleApiError } from '@/lib/utils/error-handler';

interface RegistrationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const RegistrationDrawer = ({
  isOpen,
  onClose,
  onSuccess,
}: RegistrationDrawerProps) => {
  const [step, setStep] = useState(1);
  const { address } = useAccount();
  const { mutate: register, isPending: isRegistering } = useRegisterMutation();
  const { mutate: verifyEmail, isPending: isVerifying } =
    useVerifyEmailMutation();

  const detailsFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dialCode: '+234',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().required('Required'),
      dialCode: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }
      register(
        { ...values, oxAddress: address },
        {
          onSuccess: () => {
            setStep(2);
          },
          onError: (err) => {
            handleApiError(err, 'Registration failed');
          },
        }
      );
    },
  });

  const otpFormik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Required').length(4, 'Must be 4 digits'),
    }),
    onSubmit: (values) => {
      verifyEmail(
        { email: detailsFormik.values.email, token: values.code },
        {
          onSuccess: (res) => {
            setCookie('accessToken', res.tokens.accessToken);
            toast.success('Email verified successfully');
            onSuccess();
            onClose();
          },
          onError: (err) => {
            handleApiError(err, 'Verification failed');
          },
        }
      );
    },
  });

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm overflow-y-auto p-5">
          <DrawerHeader>
            <DrawerDescription>
              {step === 1
                ? 'Please provide your details to continue.'
                : `Enter the 4-digit code sent to ${detailsFormik.values.email}`}
            </DrawerDescription>
          </DrawerHeader>

          {step === 1 ? (
            <form onSubmit={detailsFormik.handleSubmit} className="space-y-4">
              <Input
                id="firstName"
                label="First Name"
                placeholder="John"
                {...detailsFormik.getFieldProps('firstName')}
                {...detailsFormik.getFieldMeta('firstName')}
              />
              <Input
                id="lastName"
                label="Last Name"
                placeholder="Doe"
                {...detailsFormik.getFieldProps('lastName')}
                {...detailsFormik.getFieldMeta('lastName')}
              />
              <Input
                id="email"
                label="Email Address"
                placeholder="john@example.com"
                {...detailsFormik.getFieldProps('email')}
                {...detailsFormik.getFieldMeta('email')}
              />
              <InputPhone
                id="phone"
                label="Phone Number"
                {...detailsFormik.getFieldProps('phone')}
                {...detailsFormik.getFieldMeta('phone')}
                {...detailsFormik.getFieldHelpers('phone')}
                onCountryChange={(value) => {
                  const callingCode = getCountryCallingCode(value as Country);
                  detailsFormik.setFieldValue('dialCode', `+${callingCode}`);
                }}
              />
              <Button
                type="submit"
                isLoading={isRegistering}
                className="w-full"
              >
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={otpFormik.handleSubmit} className="space-y-4">
              <Input
                id="code"
                label="Verification Code"
                placeholder="1234"
                {...otpFormik.getFieldProps('code')}
                {...otpFormik.getFieldMeta('code')}
              />
              <Button type="submit" isLoading={isVerifying} className="w-full">
                Verify & Continue
              </Button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-brand-primary w-full text-center text-sm font-semibold"
              >
                Back to Details
              </button>
            </form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default RegistrationDrawer;

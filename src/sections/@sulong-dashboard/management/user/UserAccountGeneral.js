import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useRef } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// firebase
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../../utils/firebase';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
// _mock
import { countries } from '../../../../_sulong_mock';
// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

import { UpdateUser } from '../../../../pages/sulong-management/users/user';
// ----------------------------------------------------------------------

export default function UserAccountGeneral() {
  const setProofUrlRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  //   const UpdateUserSchema = Yup.object().shape({
  //     firstName: Yup.string().required('Name is required'),
  //   });

  const defaultValues = {
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    cover: user?.profile_url || '',
    phoneNumber: user?.phone_number || '',
    username: user?.username || '',
    gender: user?.gender || '',
    country: user?.country || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zip_code || '',
  };

  const methods = useForm({
    // resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const uploadImage = (proofImage, payload) => {
    if (proofImage != null) {
      const imageRef = ref(storage, `${proofImage.name + Math.floor(Math.random * 1000)}`);
      uploadBytes(imageRef, proofImage)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setProofUrlRef.current = url;
            preSubmitHandler(payload);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const preSubmitHandler = async (rawPayload) => {
    const payload = rawPayload;
    payload.profile_url = setProofUrlRef.current;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await UpdateUser(payload);

      enqueueSnackbar('Account update success!');
      await delay(1500);

      window.location.reload(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const payload = {};
    payload.firstName = data.first_name;
    payload.lastName = data.last_name;
    payload.email = data.email;
    payload.phoneNumber = data.phone_number;
    payload.userName = data.username;
    payload.gender = data.gender;
    payload.address = data.address;
    payload.country = data.country;
    payload.city = data.city;
    payload.zipCode = data.zip_code;

    // console.log(data);
    // console.log(payload);
    uploadImage(data.cover, payload);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const gender = [
    { id: 1, label: 'Male' },
    { id: 2, label: 'Female' },
    { id: 3, label: 'Others' },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="cover"
              accept="image/*"
              maxSize={51338758}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Edit profile picture
                  <br />
                  Allowed *.jpeg, *.jpg, *.png,
                  <br /> max size of {fData(51338758)}
                </Typography>
              }
            />

            {/* <RHFSwitch name="isPublic" labelPlacement="start" label="Public Profile" sx={{ mt: 5 }} /> */}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email Address" />

              <RHFTextField name="phoneNumber" label="Phone Number" />

              <RHFTextField name="username" label="Username" />
              <RHFSelect name="gender" label="Gender" placeholder="Gender">
                <option value="" />
                {gender.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="address" label="Address" />

              <RHFSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              {/* <RHFTextField name="state" label="State/Region" /> */}

              <RHFTextField name="city" label="City" />
              <RHFTextField name="zipCode" label="Zip/Code" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

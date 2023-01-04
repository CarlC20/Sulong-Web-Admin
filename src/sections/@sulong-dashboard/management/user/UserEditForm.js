import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
import { countries } from '../../../../_sulong_mock';
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

import { UpdateUser } from '../../../../pages/sulong-management/users/user';

import { storage } from '../../../../utils/firebase';

// ----------------------------------------------------------------------

UserEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserEditForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const setProofUrlRef = useRef();

  const [id, setId] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // email: Yup.string().required('Email is required').email(),
    // phoneNumber: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Address is required'),
    // country: Yup.string().required('country is required'),
    // company: Yup.string().required('Company is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    // role: Yup.string().required('Role Number is required'),
    cover: Yup.mixed().test('required', 'Profile picture is required', (value) => value !== ''),
  });

  //   const defaultValues = useMemo(
  //     () => ({
  //       firstName: currentUser?.first_name || '',
  //       lastName: currentUser?.last_name || '',
  //       email: currentUser?.email || '',
  //       cover: currentUser?.profile_url || '',
  //       phoneNumber: currentUser?.phone_number || '',
  //       username: currentUser?.username || '',
  //       gender: currentUser?.gender || '',
  //       country: currentUser?.country || '',
  //       address: currentUser?.address || '',
  //       city: currentUser?.city || '',
  //       zipCode: currentUser?.zip_code || '',
  //     }),
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     [currentUser]
  //   );
  const defaultValues = {
    firstName: currentUser?.first_name || '',
    lastName: currentUser?.last_name || '',
    email: currentUser?.email || '',
    cover: currentUser?.profile_url || '',
    phoneNumber: currentUser?.phone_number || '',
    username: currentUser?.username || '',
    gender: currentUser?.gender || '',
    country: currentUser?.country || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    zipCode: currentUser?.zip_code || '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

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
      await UpdateUser(id, payload);

      enqueueSnackbar('User account update success!');
      await delay(1500);

      window.location.reload(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    setId(currentUser.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    const payload = {};
    payload.first_name = data.firstName;
    payload.last_name = data.lastName;
    payload.email = data.email;
    payload.phone_number = data.phoneNumber;
    payload.username = data.userName;
    payload.gender = data.gender;
    payload.address = data.address;
    payload.country = data.country;
    payload.city = data.city;
    payload.zip_code = data.zipCode;

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
          <Card sx={{ py: 10, px: 3 }}>
            <Box sx={{ mb: 5 }}>
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
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(51338758)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
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

              <RHFTextField name="city" label="City" />
              <RHFTextField name="zipCode" label="Zip/Code" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

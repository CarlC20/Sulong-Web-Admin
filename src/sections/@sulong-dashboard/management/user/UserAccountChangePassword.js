import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { UpdatePassword } from '../../../../pages/sulong-management/users/user';
import useAuth from '../../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../../../routes/paths';

const md5 = require('md5');
// ----------------------------------------------------------------------

export default function UserAccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const { user } = useAuth();
  const onSubmit = async (data) => {
    const payload = {};
    payload.password = data.newPassword;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(user.password);
      console.log(md5(data.oldPassword));

      if (user.password === md5(data.oldPassword)) {
        await UpdatePassword(payload);
        enqueueSnackbar('Password changed successfully!');
        await delay(1500);

        window.location.reload(true);
      } else {
        enqueueSnackbar('Wrong password. Try again.', { variant: 'error' });
        alert(user.password);
        reset();
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="oldPassword" type="password" label="Old Password" />

          <RHFTextField name="newPassword" type="password" label="New Password" />

          <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}

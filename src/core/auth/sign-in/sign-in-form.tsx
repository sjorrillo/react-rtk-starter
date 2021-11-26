import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SigninForm, SigninSchema } from './models/sign-in';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IOwnProps {}

const SignInForm: React.FC<IOwnProps> = () => {
  const methods = useForm<SigninForm>({
    resolver: yupResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
  } = methods;

  const handleSubmit = React.useCallback((data) => {
    // TODO: submit data
    console.log('handleSubmit', data);
  }, []);

  return (
    <Container maxWidth="xs">
      <FormProvider {...methods}>
        <Box component="form" onSubmit={submitWrapper(handleSubmit)} noValidate>
          <Controller
            name="email"
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                autoComplete="email"
                error={!!(errors.email as any)?.message}
                helperText={(errors.email as any)?.message}
                inputRef={ref}
                label="Email Address"
                margin="normal"
                onChange={({ target }) => onChange(target.value)}
                value={value}
                autoFocus
                fullWidth
              />
            )}
          />

          <Controller
            name="password"
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                autoComplete="current-password"
                error={!!(errors.password as any)?.message}
                helperText={(errors.password as any)?.message}
                inputRef={ref}
                label="Password"
                margin="normal"
                onChange={({ target }) => onChange(target.value)}
                type="password"
                value={value}
                autoFocus
                fullWidth
              />
            )}
          />

          <Controller
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    color="primary"
                    onChange={({ target }) => onChange(target.checked)}
                  />
                }
                label="Remember me"
              />
            )}
          />
          <Button color="primary" sx={{ mt: 3, mb: 2 }} type="submit" variant="contained" fullWidth>
            Sign In
          </Button>
        </Box>
      </FormProvider>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInForm;

import { boolean, InferType, object, string } from 'yup';
import t from '../../../modules/i18n';

export const SigninSchema = object({
  rememberMe: boolean().optional(),
  email: string().required(t('Insert an email')).email(t('Insert a valid email')),
  password: string()
    .required(t('Insert a password'))
    .min(6, t('Your password must have at least |min| characters', { min: 6 })),
});

export type SigninForm = InferType<typeof SigninSchema>;

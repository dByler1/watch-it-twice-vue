import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '_field_ is required.'
});

extend('email', {
  ...required,
  message: 'Please enter a valid email.'
});
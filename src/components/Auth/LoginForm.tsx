import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import supabase from '../../utils/supabase';
import Spinner from '../primitives/Spinner';
import TextInput from '../primitives/TextInput';

type FormValues = { email: string; password: string };

export default function LoginForm() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [isSubmitting, setSubmitting] = React.useState(false);

  async function signIn(values: FormValues) {
    try {
      setSubmitting(true);
      const { error } = await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      });
      if (error) throw new Error(error.message);
      history.replace('/');
    } catch (e: any) {
      setSubmitting(false);
      toast.error(e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(signIn)} className="mt-10">
      <div className="space-y-4">
        <TextInput
          id="email"
          label="Email"
          type="email"
          placeholder="person@example.com"
          isInvalid={!!errors.email}
          validationMessage={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
          })}
          required
        />
        <TextInput
          id="password"
          type="password"
          label="Password"
          isInvalid={!!errors.password}
          validationMessage={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            min: { value: 6, message: 'Password is too short' },
          })}
          required
        />
      </div>
      <button className="btn primary w-full h-12 mt-8" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner className="text-2xl" /> : 'Login'}
      </button>
    </form>
  );
}

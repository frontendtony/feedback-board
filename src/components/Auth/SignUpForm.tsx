import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import supabase from '../../utils/supabase';
import Spinner from '../primitives/Spinner';
import TextInput from '../primitives/TextInput';

type FormValues = { name: string; email: string; password: string };

export default function SignUpForm() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [isSubmitting, setSubmitting] = React.useState(false);

  async function signUp(values: FormValues) {
    try {
      setSubmitting(true);
      const { user, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (signUpError) throw new Error(signUpError.message);
      const { error: createProfileError } = await supabase
        .from('profiles')
        .insert([{ id: user?.id, name: values.name, username: user?.email?.split('@')[0] }], {
          returning: 'minimal',
        });
      if (createProfileError) {
        await supabase.from('profiles').delete();
        throw new Error(createProfileError.message);
      }
      toast.success('Account created successfully');
      history.replace('/');
    } catch (e: any) {
      setSubmitting(false);
      toast.error(e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div className="space-y-4 mt-10">
        <TextInput
          id="name"
          label="Full Name"
          placeholder="John Doe"
          isInvalid={!!errors.name}
          validationMessage={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            min: { value: 2, message: 'Enter at least 2 characters' },
            maxLength: { value: 100, message: 'Nobody has a name that long' },
          })}
          required
        />
        <TextInput
          id="email"
          label="Email"
          type="email"
          placeholder="person@example.com"
          isInvalid={!!errors.email}
          validationMessage={
            errors.email?.message || "It doesn't have to be your real email address"
          }
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
        {isSubmitting ? <Spinner className="text-2xl" /> : 'Sign Up'}
      </button>
    </form>
  );
}

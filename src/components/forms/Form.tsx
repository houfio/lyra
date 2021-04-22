import { ComponentPropsWithoutRef } from 'react';
import { DefaultValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type Props<T> = {
  values?: DefaultValues<T>,
  onSubmit: SubmitHandler<T>
};

export function Form<T>({ values, onSubmit, ...props }: Props<T> & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>) {
  const form = useForm({
    defaultValues: values
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      />
    </FormProvider>
  );
}

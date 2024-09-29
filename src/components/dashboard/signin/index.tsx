'use client'

/** libs */
import { useTransition } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { redirect } from 'next/navigation'

/** components */
import { FormItem, FormItemLabel, FormItemMessage } from '@/components/ui/form-item'
import { Input } from '@/components/ui/input'
import { InputPassword } from '@/components/ui/input-password'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

/** actions */
import { signIn } from './actions'

/** types */
import type { SignInFormType } from '@/types/dashboard/authentication'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<SignInFormType>({
    mode: 'onSubmit',
  })

  const [isLoading, startTransition] = useTransition()

  const onSubmit: SubmitHandler<SignInFormType> = async (formData) => {
    startTransition(async () => {
      const { error } = await signIn(formData)

      if (error) {
        setError('root', { type: 'custom', message: error })
      } else {
        redirect('/dashboard')
      }
    })
  }

  return (
    <form className="mx-auto flex w-[24.375rem] flex-col items-center gap-y-5 px-5" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
      {errors.root ? <p className="mt-2 text-sm text-destructive">{errors.root.message}</p> : null}
      <FormItem className="w-full">
        <FormItemLabel>Email</FormItemLabel>
        <Input
          placeholder="Email"
          {...register('email', {
            required: 'Please enter email',
            onChange: () => {
              clearErrors('email')
              clearErrors('root')
            },
          })}
        />
        {errors.email ? (
          <FormItemMessage isError className="font-medium">
            {errors.email.message}
          </FormItemMessage>
        ) : null}
      </FormItem>
      <FormItem className="w-full">
        <FormItemLabel>Password</FormItemLabel>
        <InputPassword
          placeholder="Password"
          {...register('password', {
            required: 'Please enter password',
            onChange: () => {
              clearErrors('password')
              clearErrors('root')
            },
          })}
        />
        {errors.password ? (
          <FormItemMessage isError className="font-medium">
            {errors.password.message}
          </FormItemMessage>
        ) : null}
      </FormItem>
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
        Sign In
      </Button>
    </form>
  )
}

export { SignIn }

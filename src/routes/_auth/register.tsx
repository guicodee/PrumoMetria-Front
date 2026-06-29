import { Button } from '#/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field';
import { Input } from '#/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { formRegisterSchema, type FormRegisterData } from './-features/auth-schema';
import { PostAuth } from './-features/auth-service';

export const Route = createFileRoute('/_auth/register')({
  component: RegisterComponent,
  head: () => ({ 
    meta: [
      {
        title: 'Register | prumo.metria'
      },
      {
        name: 'description',
        content: 'Crie sua conta gratuitamente e comece a organizar seus estudos com o Prumo Metria.'
      },
    ]
  })
});

function RegisterComponent() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<FormRegisterData>({
    resolver: zodResolver(formRegisterSchema),
    mode: 'onTouched',
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  async function onSubmit(data: FormRegisterData) {
    form.clearErrors("root");

    try {
      await PostAuth("Account/register", data);
      navigate({ to: "/login"});
    } catch (error) {
      const message = error instanceof Error ? error.message : null;

      const errorMessage: Record<string, string> = {
        "DuplicateUserName": "Usuário já existente, tente novamente.",
        "DuplicateEmail": "Usuário já existente, tente novamente.",
        "InvalidEmail": "E-mail inválido.",
        "PasswordTooShort": "Senha precisa ter no mínimo 8 caracteres.",
      };

      form.setError("root", {
        message: errorMessage[message ?? ""] ?? "Erro ao registrar usuário, tente novamente"
      });
    };
  };

  return (
    <div>
      <form className='w-[300px] mt-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='name'
            control={form.control} 
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Nome <span className='text-red-600'>*</span>
                </FieldLabel>
                <Input
                  {...field} 
                  id='form-register-name'
                  type='text'
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your nome complete"
                  autoComplete='off' 
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />           

          <Controller
            name='email'
            control={form.control} 
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Email <span className='text-red-600'>*</span>
                </FieldLabel>
                <Input
                  {...field} 
                  id='form-register-email'
                  aria-invalid={fieldState.invalid}
                  type='email' 
                  placeholder="Digite seu e-mail"
                  autoComplete='off' 
                />
                
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />           
        
        <Controller
          name='password'
          control={form.control} 
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Senha <span className='text-red-600'>*</span>
              </FieldLabel>
              <div className='relative'>
                <Input
                  aria-invalid={fieldState.invalid}
                  id='form-register-password'
                  type={showPassword ? 'text' : 'password'} 
                  placeholder='Digite sua senha' 
                  autoComplete='off' 
                  className='pr-10'
                  {...field} 
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:cursor-pointer hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />       

        <Button
          variant={'outline'}
          type='submit'
          disabled={form.formState.isSubmitting}  
          className='w-full hover:cursor-pointer rounded-sm bg-[#34397B] hover:bg-[#2c2863] transition-colors' 
        >
          {form.formState.isSubmitting ? 
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              "Registrando..."
            </> 
            : "Registrar"
          }
        </Button>
      </FieldGroup>
      </form>

       {form.formState.errors.root && (
        <p className="text-red-500 text-sm text-center mt-4">
          {form.formState.errors.root.message}
        </p>
      )}
    
      <p className='text-center text-sm text-zinc-400 mt-6'>
        Já tem uma conta criada? {' '}
        <Link to='/register' className='text-sm underline transition-colors text-[#94ADFF] hover:text-white/80'>Acesse aqui!</Link>
      </p>
    </div>
  )
}

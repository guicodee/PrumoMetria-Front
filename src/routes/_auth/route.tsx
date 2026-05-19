import { createFileRoute, Outlet } from '@tanstack/react-router';
import Logo from "../../../public/16f59f5e-4d07-42d1-95cd-4c33f46f324c.png";

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <div className='max-w-full min-h-screen flex items-center justify-center flex-col p-4'>
      <div className='mx-auto flex justify-center flex-col items-center w-full max-w-80'>
        <img src={Logo} alt='prumometria.logo' className="max-w-40" />
        <div className='flex flex-col items-center gap-1'>
          {location.pathname.includes('/login') ? (
            <>
              <h1 className='text-2xl font-bold text-zinc-100'>prumo.metria</h1>
              <p className='text-sm font-medium text-zinc-500'>Não deixe seus estudos para depois.</p>
            </>
          ) : (
            <>
              <h1 className='text-2xl font-bold text-zinc-100'>prumo.metria</h1>
              <p className='text-sm font-medium text-zinc-500'>Comece a organizar seus estudos hoje mesmo!</p>
            </>
          )}
        </div>

        <Outlet />
      </div>
    </div>
  )
}

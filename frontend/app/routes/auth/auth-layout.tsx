import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '~/provider/auth-context'

function AuthLayout() {
  const {isAuthenticated , isLoading} = useAuth();
  if (isLoading) {
    return <div className='w-full h-screen flex items-center justify-center'>Loading...</div>
  }
  if(isAuthenticated) {
    return <Navigate to='/dashboard'  />
  }
  return (
    <div className='w-full h-screen flex items-center justify-center gap-4'>
    <Outlet/>
     </div>
  )
}

export default AuthLayout
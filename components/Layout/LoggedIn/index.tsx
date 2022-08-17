import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '@libs/apolloVar';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react'

interface IProps {
  inView: boolean;
}

const LoggedIn:React.FC<PropsWithChildren<IProps>> = ({children, inView}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const router = useRouter()

  useEffect(() => { 
    if(!isLoggedIn) router.replace('/auth/login')
  },[isLoggedIn, router])
  
  if (!inView) return null
  
  return (
    <main>
      {children}
    </main>
  )
}

export default LoggedIn
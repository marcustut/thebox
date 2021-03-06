import { Icon } from '@iconify/react'
import React from 'react'
import { FallbackProps } from 'react-error-boundary'

import { AppLayout, Button } from '@/components/Elements'

type ErrorPageProps = {
  is404?: boolean
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ is404 }) => {
  return (
    <AppLayout>
      <div className='flex flex-col justify-center items-center h-[80vh]'>
        <h1 className='text-5xl font-bold'>Error {is404 ? '404' : '500'}</h1>
        <span className='text-sm mt-1'>{is404 ? 'Page Not Found' : 'Internal Server Error'}</span>
        <Button
          size='small'
          className='text-xs font-medium mt-4'
          icon={<Icon icon='mdi:home' className='w-5 h-5' />}
          onClick={() => (window.location.href = '/app')}
        >
          Back to Home
        </Button>
      </div>
    </AppLayout>
  )
}

export const ReactBoundaryErrorPage: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <AppLayout>
      <div className='flex flex-col justify-center items-center h-[80vh]'>
        <h1 className='text-5xl font-bold'>Error Occured</h1>
        <span className='text-sm mt-1'>{error.message}</span>
        <Button
          size='small'
          className='text-xs font-medium mt-4'
          icon={<Icon icon='mdi:home' className='w-5 h-5' />}
          onClick={() => (window.location.href = '/app')}
        >
          Back to Home
        </Button>
      </div>
    </AppLayout>
  )
}

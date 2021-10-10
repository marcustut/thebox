import React from 'react'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

import { Spinner } from '@/components/Elements'

const sizeClassnames = {
  big: 'py-2 px-6 rounded-xl',
  small: 'px-2 py-1 text-sm rounded-lg',
  tiny: 'px-1 text-sm rounded-sm'
}

const colorClassnames = {
  primary:
    'text-white bg-primary transition duration-200 ease-in-out hover:bg-primary-hover disabled:text-primary-disabled disabled:bg-primary-hover',
  secondary:
    'bg-secondary hover:bg-secondary-hover disabled:bg-secondary-disabled dark:disabled:text-secondary-disabled dark:disabled:bg-secondary-hover',
  gradient:
    'text-white bg-gradient-to-tr from-primary-900 to-primary-400 transition duration-200 ease-in-out hover:bg-primary-hover disabled:text-primary-disabled disabled:bg-primary-hover',
  transparent: 'text-white bg-transparent'
}

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  size?: keyof typeof sizeClassnames
  color?: keyof typeof colorClassnames
  loading?: boolean
  icon?: ReactNode
  transition?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = 'big',
  color = 'primary',
  disabled,
  loading,
  icon,
  className = '',
  transition = true,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`flex focus:outline-none focus:ring-4 ${
        color === 'primary' || color === 'gradient'
          ? 'focus:ring-primary-ring'
          : 'focus:ring-secondary-ring dark:focus:ring-secondary-ring'
      } ${sizeClassnames[size]} ${transition ? `transition duration-200 ease-in-out` : ``} ${
        colorClassnames[color]
      } font-bold flex items-center justify-center ${className}`}
      data-testid='button'
      {...props}
    >
      <span className={loading ? 'opacity-0' : `flex items-center`}>
        {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
        {children}
      </span>
      {loading ? (
        <span className={`absolute`}>
          <Spinner size={size === 'small' ? 'tiny' : 'small'} />
        </span>
      ) : null}
    </button>
  )
}
import { useField } from 'formik'
import React from 'react'

import { Input, InputErrorMsg } from '@/components/Elements'

export type InputFieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string
  errorMsg?: string
  altErrorMsg?: string
  errorMsgColor?: string
  label?: string
  textarea?: boolean
  rows?: number
  inputClassName?: string
  noError?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  errorMsg,
  errorMsgColor = 'text-[#ff4d4d]',
  ref: _,
  className,
  inputClassName = '',
  noError = false,
  ...props
}) => {
  const [field, meta] = useField(props)

  return (
    <div className={`${className}`}>
      {label && <div className={`flex mb-1 font-semibold text-sm`}>{label}</div>}
      <Input error={meta.error} textarea={textarea} className={inputClassName} {...field} {...props} />
      {!noError && meta.error && meta.touched && (
        <div className={`flex mt-1 text-sm`}>
          <InputErrorMsg className={errorMsgColor}>{errorMsg || meta.error}</InputErrorMsg>
        </div>
      )}
    </div>
  )
}

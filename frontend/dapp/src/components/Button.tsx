import React, { ReactNode } from 'react'
import { ButtonType } from '../models'

interface IButtonProps {
    children:ReactNode,
    type?:ButtonType,
    onClick:()=>Promise<void>
}

const Button = ({children, type, onClick}:IButtonProps) => {
  return (
    <button onClick={onClick} className={`ml-3 inline-flex rounded-md shadow
     items-center justify-center rounded-md border border-transparent 
     bg-white px-5 py-3 text-base font-medium 
     text-indigo-600 hover:bg-indigo-50`}>
        {children}
    </button>
  )
}

export default Button
import React, { Dispatch, SetStateAction } from 'react'

interface IInputProps {
    value:string,
    onChange:any,
    placeholder:string
}

const Input = ({value, onChange, placeholder}:IInputProps) => {
  return (
    <div className="flex justify-center">
  <div className="xl:w-96">
    <input
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      type="text"
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        ml-4
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      placeholder={placeholder}
    />
  </div>
</div>
  )
}

export default Input
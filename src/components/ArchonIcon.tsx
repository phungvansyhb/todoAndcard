import React from 'react'
interface Props  {
    icon : React.ReactNode
    bgColor? : string
    onClick?: (params : any)=>unknown
    className?:string
}

export default function ArchonIcon<T extends Props>({icon , bgColor='bg-green-500' , onClick , className, ...props} : T) {
  return (
    <div className={`rounded-full ${bgColor} fixed bottom-10 right-10 p-4 shadow-2xl cursor-pointer ${className}`} onClick={onClick} {...props}>{icon}</div>
  )
}
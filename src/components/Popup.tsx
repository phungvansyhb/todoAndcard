import React from 'react'

type Props = {
    children : React.ReactElement,
    popUpContent : React.ReactNode
}

export default function Popup({children , popUpContent}: Props) {
  return (
    <div className='relative popup-container z-10 '>
        {children}
        <div className='absolute right-0 z-10 popup-content hidden bg-white rounded-lg shadow-lg border '>
            {popUpContent}
        </div>
    </div>
  )
}
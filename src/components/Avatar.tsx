import React from 'react'
import { User } from '../typeDef/User'
import { Tooltip } from 'react-tooltip';

 

export default function Avatar({avatar , gender , id , name}: User) {
  return (
    <div> 
        <img src={avatar} alt={name} key={id} className='rounded-full' width={24} height={24} id={`avatar-user-${id}`}/>
        <Tooltip anchorId={`avatar-user-${id}`}>
            <div className='italic'>
                {`${name} - ${gender}`}
            </div>
        </Tooltip>
    </div>
  )
}
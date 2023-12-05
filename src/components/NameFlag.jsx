import React from 'react'

const NameFlag = ({name, imgUrl}) => {
  return (
    <div className='flex justify-start gap-2 items-center'>
        <img src={imgUrl} alt='country-flag' className='w-4 h-4'/>
        <span>{name}</span>
    </div>
  )
}

export default NameFlag
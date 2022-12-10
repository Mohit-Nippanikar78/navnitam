import React,{useState} from 'react'
import {BallTriangle} from 'react-loader-spinner'


const Spinner = ({message}) => {


  return (
    <div className='flex h-1/3 items-center justify-center flex-col m-4'>
      <BallTriangle color="black" height={80} width={80} />
      <p className="flex text-lg items-center m-5">
        {message}

      </p>
    </div>
  )
}

export default Spinner
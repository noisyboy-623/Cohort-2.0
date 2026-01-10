import React from 'react'
import Details from './Details'

const List = ({ name, email, time, isLast }) => {
  return (
    <div className='list'>
        <Details name={name} email={email} time={time}/>
        {!isLast && <hr />}
    </div>
  )
}

export default List
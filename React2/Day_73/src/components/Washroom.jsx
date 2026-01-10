import React from 'react'

const Washroom = (gender) => {
  return (
    <div className={`card ${gender.gender}`}>{gender.gender} Washroom</div>
  )
}

export default Washroom
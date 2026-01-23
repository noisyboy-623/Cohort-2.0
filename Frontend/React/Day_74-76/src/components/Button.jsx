import React from 'react'

const Button = (e) => {
  return (
    <button
        className={`btn btn-${e.color}`}
    >
    </button>
  )
}

export default Button
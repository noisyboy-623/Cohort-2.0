import React from 'react'
import {RiMore2Line} from "@remixicon/react";

const Details = (e) => {
  
  return (
    <div>
        <div className="contact" onClick={e.onClick} >
            <img src={e.imageURL} />
            <div className="info">
                <h2>{e.name}</h2>
                <p>{e.email} . {e.time}</p>
            </div>  
            <RiMore2Line className='icon' />        
        </div>
        {!e.isLast && <hr />}  
    </div>
  )
}

export default Details
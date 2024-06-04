import React from 'react'
import './FilterItem.css'
import { Link } from 'react-router-dom'

export const FilterItem = (props) => {
  
  if(props.status === 'img' ) {
    return (
      <div className='filterItem'> 
          <img src={props.item.img} alt="img" />
          <p className="titlee">
              {props.item.title}
          </p>
      </div>
    )
  }
  return (
    <div className='filterItem'> 
          <Link to="#" className="forum_title">
              {props.item.title}
          </Link>
      </div>
  )
} 

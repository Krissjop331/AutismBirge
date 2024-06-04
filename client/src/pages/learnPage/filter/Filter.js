import React from 'react'
import './Filter.css'

export const Filter = () => {
  return (
    <div className='filter'>
        <h3>Фильтр</h3>
        <div className="filterInput">
            <select name="" id="">
                <option value="learn">Обучение</option>
            </select>
            <div className="arrows">
                <img src="./img/filterButtonUp.svg" alt="" />
                <img src="./img/filterButtonDown.svg" alt="" />
            </div>
        </div>
    </div>
  )
}

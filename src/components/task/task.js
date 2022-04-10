import React from 'react'
import './task.scss';

export default function task(props) {
        const {task} = props;
      
  return (
    <>
        <li>
                {
                 <img className="img-item-list" src={task.cover} alt=""/>
                }
                
                {task.title}
        
        </li>
        
     
    </>
  )
}

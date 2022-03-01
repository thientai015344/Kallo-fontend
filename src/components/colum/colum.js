import React from 'react'

import './colum.scss'
import Task from '../task/task.js'


export default function colum() {
  return (
    <>
        <div className="item-list-ul" >
                <header className="brainstom"> sap lam</header>
                <ul>
                        <Task />
                        
                </ul>
                <footer className="footerf"> footer add nother card </footer>
            </div>

        
    </>
  )
}

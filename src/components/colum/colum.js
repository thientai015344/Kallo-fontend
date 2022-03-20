import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd';
import './colum.scss'
import Task from '../task/task.js'


export default function Colum(props) {

  const {column , onCardDrrop} = props
  const task = column.cards


  
  
  return (
    <>
        <div className="item-list-ul" >
                <header className="brainstom column-drag-handle"> {column.title} </header>
                <ul>
                  <Container
                    groupName='dev'
                    onDragStart={e => console.log('drag started', e)}
                    onDragEnd={e => console.log('drag end', e)}
                    onDrop={dropResult => onCardDrrop(column.id, dropResult)} 
                    getChildPayload={index => task[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    onDragEnter={()=>{
                    console.log('drag enter', column.id);   
                    }}
                    onDragLeave={()=>{
                      console.log('drag leave', column.id);
                    }}
                    onDropReady={p=> console.log('drop ready', p)}
                    dropPlaceholder={{
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'card-drop-placeholder'
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >


                    
                    {task.map((card, index) =>
                       <Draggable key={index}>


                         <Task task={card} />                   

                         </Draggable>
                    )}
                  </Container>
                </ul>
                <footer className="footerf"> footer add nother card </footer>
            </div>

        
    </>
  )
}



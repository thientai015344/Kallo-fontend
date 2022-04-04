import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './colum.scss'
import Task from '../task/task.js'


export default function Colum(props) {

  const {column , onCardDrrop} = props
  const task = column.cards


  
  
  return (
    <>
        <div className="item-list-ul" >
                <header className="brainstom column-drag-handle">
                  <div className="column-title">
                  {column.title} 
                  </div>
                  <div className="column-dropdown-action">
                  <Dropdown>
                    <Dropdown.Toggle  id="dropdown-basic" size="sm" className="dropdown-btn"/>

                    <Dropdown.Menu>
                    <Dropdown.Header className="dropdown-header">Manipulation</Dropdown.Header>
                      <Dropdown.Item>Add card</Dropdown.Item>
                      <Dropdown.Item>Remove column</Dropdown.Item>
                      <Dropdown.Item>Move all cards in the list..(beta)</Dropdown.Item>
                      <Dropdown.Item>Archive all cards in this column..(beta)</Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                  </div>
                  

                </header>
                <ul>
                  <Container
                    groupName='dev'
                    onDragStart={e => console.log('drag started', e)}
                    onDragEnd={e => console.log('drag end', e)}
                    onDrop={dropResult => onCardDrrop(column.id, dropResult)} 
                    getChildPayload={index => task[index]}
                    dragclassName="card-ghost"
                    dropclassName="card-ghost-drop"
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
                <form className="form-addcard" >

                        <div className="form-addd">
                      
                          <textarea  type="text"
                          cols={5}
                          //  ref={newclumiputref} 
                          // value={newtitlecolum} name="title" 
                          // onChange={event => setnewtitlecolum(event.target.value)} 
                          // onKeyDown={e => e.key === 'Enter' && addcolumn()}
                          placeholder="nhập tiêu đề cho thẻ này !"
                           className="form-addd"
                            id="add-clum"/>
                          <button className="btn btn-addgg"type="button">Thêm thẻ</button>  
                          <button  className="btn btn-cane"type="button">hủy</button> 

                        </div>
                    </form>
                <footer className="footerf">
                   <button className="btn btn-addCard"type="button"><i>+    </i>   Thêm Thẻ</button>
                </footer>
            </div>

        
    </>
  )
}



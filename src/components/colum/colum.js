import React, { useEffect, useState , useRef} from 'react'
import { Container, Draggable } from 'react-smooth-dnd';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmModal from '../../common/ConfirmModal.js'
import{  MODAL_ACTION_CONFIRM} from '../../unilities/constant.js'
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import './colum.scss'
import Task from '../task/task.js'
import {cloneDeep} from 'lodash'



export default function Colum(props) {
  const newclumiputref = useRef()
  const {column , onCardDrrop, onUpdateColumn} = props
  const [columtitle , setcolumntitle] = useState(column.title)
  const [newtitlecard, setnewtitlecard]= useState('')
  const task = column.cards
  const [showconfirmModal, setshowconfirmModal] = useState(false)
  const toggleShowconfirmModal = () => setshowconfirmModal(!showconfirmModal)
  const [opennewcard, setopennewcard]= useState(false)

  useEffect(() => {
    if(newclumiputref && newclumiputref.current){
      newclumiputref.focus()
      newclumiputref.current.select()
    }
  }, [opennewcard])

  const handlesaveTitle =(value) => {
    console.log('blur',value.value )
  }
  const onConfirmModal = (type) =>{

    if(type === MODAL_ACTION_CONFIRM){
      const newColunm ={
         ...column,
         _destroy: true,
      }
      onUpdateColumn(newColunm)
    }
    toggleShowconfirmModal()

  }

  const addtocard = () =>{
    if(!newtitlecard ){
      newclumiputref.current.focus();
      return
    }
    const newCardToAdd ={
      id : Math.random().toString(36).substring(2,5),
      boardId: column.boardId,
      columnId: column.id, 
      title: newtitlecard.trim(),
      cover: null
    }
 
    let newColunm = cloneDeep(column)
    newColunm.cards.push(newCardToAdd)
    newColunm.cardOrder.push(newCardToAdd.id)


    onUpdateColumn(newColunm)
    setnewtitlecard('')
    setopennewcard(!opennewcard)


  }



  const showaddcard =() =>{
    setopennewcard(!opennewcard)
  }

  
  
  return (
    <>
        <div className="item-list-ul" >
                <header className="brainstom column-drag-handle">
                  <div className="column-title">
                     
                  
                  <EditText
                    name="textbox1"
                    defaultValue={columtitle} 
                    onChange={setcolumntitle}
                    onSave={handlesaveTitle}
                 
                   />
                  </div>
                  <div className="column-dropdown-action">
                  <Dropdown>
                    <Dropdown.Toggle  id="dropdown-basic" size="sm" className="dropdown-btn"/>

                    <Dropdown.Menu>
                    <Dropdown.Header className="dropdown-header">Manipulation</Dropdown.Header>
                      <Dropdown.Item>Add card</Dropdown.Item>
                      <Dropdown.Item onClick={toggleShowconfirmModal}>Remove column</Dropdown.Item>
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
                {opennewcard && 
                
                    <form className="form-addcard" >

                        <div className="form-addd">
                          
                      
                          <textarea  type="text"
                          cols={5}
                         //  ref={newclumiputref} 
                          value={newtitlecard} name="title" 
                          onChange={event => setnewtitlecard(event.target.value)} 
                          onKeyDown={e => e.key === 'Enter' && addtocard()}
                          placeholder="nhập tiêu đề cho thẻ này !"
                           className="form-addd"
                            id="add-clum"/>
                          <button  onClick ={() => addtocard()} className="btn btn-addgg"type="button">Thêm thẻ</button>  
                          <button onClick={showaddcard}  className="btn btn-cane"type="button">hủy</button> 

                        </div>
                    </form>
                
                }
                {!opennewcard && 

                  <footer className="footerf">
                    <button onClick={showaddcard} className="btn btn-addCard"type="button"><i>+    </i>   Thêm Thẻ</button>
                  </footer>
                
                
                }


              <ConfirmModal 

                show = {showconfirmModal}
                onAction = {onConfirmModal}     
                title="Remove column"
                content={`are you sure you want to remove this ${column.title}? all related card will also be removed`}                   
              />

            </div>

        
    </>
  )
}



import React, { useEffect, useState , useRef} from 'react'
import { Container, Draggable } from 'react-smooth-dnd';
import {applyDrag} from '../../unilities/dragDrop'
import {isEmpty} from 'lodash'
import {initialData} from '../../action/initialData'
import './boardContent.scss'
import Colum from '../colum/Colum.js'




export default function BoardContent() {
  
  const [board, setboard]= useState({})
  const [columns, setcolumns]= useState([])
  const [opennewcolumn, setopennewcolumn]= useState(false)
  const [newtitlecolum, setnewtitlecolum]= useState('')

  const newclumiputref = useRef()


  useEffect(()=> {
    const booardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if(booardFromDB){
      setboard(booardFromDB)

      //soft columns
      booardFromDB.columns.sort(function (a,b) {
        return booardFromDB.columnOrder.indexOf(a.id) - booardFromDB.columnOrder.indexOf(b.id)
      })
       setcolumns(booardFromDB.columns)
      //setcolumns(mapOrder(booardFromDB.columns, booardFromDB.columnOrder, 'id'))
    }
  }, [])


  useEffect(() => {
    if(newclumiputref && newclumiputref.current){
      newclumiputref.current.focus()
      newclumiputref.current.select()
    }
  }, [opennewcolumn])





  if(isEmpty(board)){
    return <div className="notfound">board is a not found</div>
  }




  const onColumnDrop = (dropResult) => {
    console.log("dropResult", dropResult)

    let newColunms = [...columns]
    newColunms = applyDrag(newColunms, dropResult)

  

    setcolumns(newColunms)
    setboard(board)

  }


  const onCardDrrop = (columnId, dropResult) => {
   console.log('card drop', dropResult);

   if(dropResult.removedIndex !== null || dropResult.addedIndex !== null){
      console.log('clumnId', columnId);
      console.log('dropResult', dropResult);

       let newColunms = [...columns]

       let currentColunm  = newColunms.find(c=> c.id === columnId) 
      currentColunm.cards = applyDrag(currentColunm.cards, dropResult)
      currentColunm.cardOrder = currentColunm.cards.map(i => i.id)
      console.log('ddddd',newColunms)
      setcolumns(newColunms)
   }

  }

   const openaddcolum = () =>{

    setopennewcolumn(!opennewcolumn)

  }


  const addcolumn = () =>{
    if(!newtitlecolum ){
      newclumiputref.current.focus();
    }
      const addnewcolumn ={
        id: Math.random().toString(36).substring(2, 5), //5 random character, will remove when we implement code aip 
        boardId: board.id,
        title: newtitlecolum.trim(),
        cardOrder: [],
        cards: []
      }
      let newColunms = [...columns]
      newColunms.push(addnewcolumn)
      setcolumns(newColunms)
      setnewtitlecolum('')
      setopennewcolumn(!opennewcolumn)  
  }

  const onUpdateColumn =(newColumnToUpdate) =>{
    const IdColumnUpdate = newColumnToUpdate.id;

    let newColunms = [...columns]
    const indexColumnToUpdate = newColunms.findIndex(i => i.id === IdColumnUpdate)
    if( newColumnToUpdate._destroy) {
      newColunms.splice(indexColumnToUpdate, 1)
    }
    else{
      newColunms.splice(indexColumnToUpdate, 1 , newColumnToUpdate)

    }
    let newboard = [...board]
    newboard.columnOrder = newColunms.map(c => c.id)
    newboard.columns = newColunms

    setcolumns(newColunms)
    setboard(newboard)

  }



  return (
    <>
         <div className="content-workspace">
           <Container
           orientation="horizontal"
           onDrop={onColumnDrop}
           dragHandleSelector=".column-drag-handle"
           getChildPayload={index => columns[index]}
           dropPlaceholder={{
             animationDuration: 150,
             show: true,
             className:'colunm-drop-preview'
           }}
           >
             {columns.map((column, index)=>
 
              (
                <Draggable key={index}>

                  <Colum column={column} onCardDrrop={onCardDrrop} onUpdateColumn={onUpdateColumn} />

                </Draggable>

              )
              
 
             )}

           <div>
                {!opennewcolumn && 
                
                
                  <button onClick ={() => openaddcolum()} className="btn-addColumn"type="button"><i>+   </i>    add another column</button>
                }


                {opennewcolumn &&
                    <form >

                        <div className="form-add">
                      
                          <input  type="text" ref={newclumiputref} 
                          value={newtitlecolum} name="title" 
                          onChange={event => setnewtitlecolum(event.target.value)} 
                          onKeyDown={e => e.key === 'Enter' && addcolumn()}
                          placeholder="Nhập tiêu đề danh sách ...."
                           className="form-add"
                            id="add-clum"/>
                          <button onClick ={() => addcolumn()} className="btn btn-addgg"type="button">Thêm danh sách</button>  
                          <button onClick ={() => openaddcolum()} className="btn btn-cane"type="button">hủy</button> 

                        </div>
                    </form>
                
                }


                    
           </div>
           </Container>
        
      </div> 

      
    </>
  )
}

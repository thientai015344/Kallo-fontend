import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd';
import {applyDrag} from '../../unilities/dragDrop'
import {isEmpty} from 'lodash'
import {initialData} from '../../action/initialData'
import './boardContent.scss'
import Colum from '../colum/Colum.js'


export default function BoardContent() {
  
  const [board, setboard]= useState({})
  const [columns, setcolumns]= useState([])

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
  if(isEmpty(board)){
    return <div className="notfound">board is a not found</div>
  }

  const onColumnDrop = (dropResult) => {
    console.log("dropResult", dropResult)

    let newColunm = [...columns]
    newColunm = applyDrag(newColunm, dropResult)

    setcolumns(newColunm)

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

                  <Colum column={column} onCardDrrop={onCardDrrop}/>

                </Draggable>

              )
              
 
             )}

           </Container>
        
      </div> 
    </>
  )
}

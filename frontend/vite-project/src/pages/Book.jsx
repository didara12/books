import React from 'react'
import { useParams } from 'react-router-dom'
 
export default function Book() {
  const {id} = useParams()
  return (
    <div>the id of this book is: ${id} </div>
  )
}

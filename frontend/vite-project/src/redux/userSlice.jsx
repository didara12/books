import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  user:{
    crid:null,
    userBooks:null
  },
  books:null,
  sticky:true
}


const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    addBook: (state,action)=>{
      state.user.books.push(action.payload)
   },
    signInSuc:(state,action)=>{
      state.user.crid = action.payload
    },
    deleteUserBook: (state,action)=>{
      state.user.userBooks = state.user.userBooks.filter(item => item._id !== action.payload)
    },
    addUserBook: (state,action)=>{
       state.user.userBooks.push(action.payload)
    },
    updateUserBook: (state,action)=>{
      state.user.userBooks = state.user.userBooks.map(item => {
        if(item._id === action.payload.id) return action.payload.book
        return item
      })
    },
    sticky:(state,action)=>{
      state.sticky = action.payload
    }
    
    

  }
})

export const {signInSuc,deleteUserBook,addUserBook,updateUserBook,addBook,sticky} = userSlice.actions
export default userSlice.reducer
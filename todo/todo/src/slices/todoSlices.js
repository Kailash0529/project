import { createSlice } from "@reduxjs/toolkit";
const initialState={
    todoList:[]
}
const todoSlice=createSlice({
name:'todo',
initialState,
reducers:{
    addTodo:(state,action)=>{
        let todoText=action.payload.todoText;
        state.todoList.push({id:state.todoList.length+1,todoData:todoText,finished:false})
        
    },
    editTodo:(state,action)=>{
        let todo=action.payload.todo;
        let todoText=action.payload.todoText;
        state.todoList=state.todoList.map(t=>{
            if(t.id==todo.id)
            {
                t.todoData=todoText;
            }
            
            return t;
        });
    },
   todoFinished:(state,action)=>{
    let todo=action.payload.todo;
    let isFinished=action.payload.isFinished;
        state.todo=state.todo.map(t=>{
if(t.id==todo.id)
{
    todo.finished=isFinished;
}
return t;
        }); 
},
   deleteTodo:(state,action)=>{
    let todo=action.payload.todo;
    state.todo=state.todo.filter(t=>t.id!=todo.id)
   }
}
});
export const{deleteTodo,addTodo,todoFinished,editTodo}=todoSlice.actions;
export default todoSlice.reducer;
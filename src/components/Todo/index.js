import {Component} from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";


import './index.css'

class Todo extends Component{

    state = {inputvalue : '',todosList : [],updatedCount:0}


    onEnterInput = (event)=>{
        this.setState({inputvalue : event.target.value})
    
    }

    onAddTodo = () =>{
         const {inputvalue,updatedCount} = this.state
         const times = inputvalue.split(" ").reverse().join(" ")
         const count = times[0]
         const text = inputvalue.slice(0,-1)
       

        for (let i = 0 ; i < count ; i++){
            this.setState(prevState => (
                {todosList : [...prevState.todosList,{id:Date.now() +i,inputvalue:text,updatedCount}]}
                ))  
        }
        
        this.setState({inputvalue:''})
    }

    deleteTodo = (id) => {
        const filteredTodos = this.state.todosList.filter(each => each.id !== id);
        this.setState({ todosList: filteredTodos });
      }
    
    onUpdate = (id) =>{
        const {todosList}= this.state
        const updatedTodoCount = todosList.map(each => 
                each.id === id ? {...each,inputValue: each.inputValue,updatedCount : each.updatedCount +1 } 
                : 
                {...each,inputValue: each.inputValue,updatedCount : each.updatedCount}
             ) 
        this.setState({todosList : updatedTodoCount})
    }

    render(){
        const {todosList,inputvalue} = this.state
        return(
            <div className="bg-cont">
                <h1 className='heading'>Day Goals!</h1>
                <div className='input-cont'>
                <input type="text" placeholder='todos' className='input' value={inputvalue} onChange={this.onEnterInput}/>
                <button className='button' onClick={this.onAddTodo}>Add Todo</button>
                </div>
                <ul>
                {todosList.map(each => (
                    <li key={each.id} >
                        <div className='eachTodo'>
                    <p>{each.inputvalue} (updated {each.updatedCount} times)</p>
                    <div>
                    <button className='update-btn' onClick={() => this.onUpdate(each.id)}><FaPencilAlt /></button>
                    <button className="del-btn" onClick={() => this.deleteTodo(each.id)}><ImCross /></button>
                    </div>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
        )
    }
}

export default Todo
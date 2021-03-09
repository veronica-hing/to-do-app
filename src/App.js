import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //run on start (once)
  useEffect(()=>{
    getLocalTodos();
  }, [])
  //run every time status or todos change
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [status, todos]);

  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //saving to local storage
  const saveLocalTodos = () =>{
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos',JSON.stringify([]));
    }else{
      localStorage.setItem('todos', JSON.stringify(todos));  
    }
  };

  const getLocalTodos = () =>{
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos',JSON.stringify([]));
    } else {
      var oldTodos = JSON.parse(localStorage.getItem('todos'));
      setTodos(oldTodos);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Today's Todos</h1>
      </header>
      <Form 
        inputText = {inputText}
        setInputText = {setInputText} 
        todos = {todos} 
        setTodos = {setTodos}
        setStatus = {setStatus}
      />
      <TodoList 
        todos = {todos} 
        setTodos = {setTodos}
        filteredTodos = {filteredTodos}
        />
    </div>
  );
};

export default App;

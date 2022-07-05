import React,{useState,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Task from './Task.js';

const App = () => {
  const [enteredItem, setEnteredItem] = useState("");
  const [counter,setCounter] = useState(5);
  const [selected,setSelected] = useState('All');
  const [displayTaskList, setDisplayTaskList] = useState([]);
  const [taskList, setTaskList] = useState([
    /*{id:0,taskName: 'Buy Apple', taskStatus: false},
    {id:1,taskName: 'Learn React', taskStatus: true},
    {id:2,taskName: 'Learn Redux', taskStatus: false},
    {id:3,taskName: 'Create Spring Boot App', taskStatus: true},
    {id:4,taskName: 'Learn to Speak', taskStatus: false}*/
  ]);

  const createTask = () => {
    setTaskList((oldTasks)=>{
      return [...oldTasks,{id:counter,taskName:enteredItem,taskStatus:false}]
    });
    setCounter(prev=>{return prev+1})
    setEnteredItem("");
  }

  const markTask = (id) =>{
    const data =  [...taskList];
    for(let i=0;i<data.length;i++){
      if(data[i].id===id){
        data[i].taskStatus = !data[i].taskStatus;
      }
    }
    setTaskList(data); 
    setSelected('All');
    console.log(data);
  }

  const deleteTask = (id) =>{
    setTaskList((oldTasks)=>{
      return oldTasks.filter((data)=>{
        return data.id !== id;
      })
    });
    setSelected('All');
  }

  useEffect(() => {
    if(selected==='All'){
      setDisplayTaskList(taskList);
    }
    else if(selected==='Active'){
      setDisplayTaskList(()=>{
        return taskList.filter((data)=>{
          return data.taskStatus===false;
        })
      }
      )
    }
    else{
      setDisplayTaskList(()=>{
        return taskList.filter((data)=>{
          return data.taskStatus===true;
        })
      }
      )
    }
  }, [selected])
  
  useEffect(() => {
    setDisplayTaskList(taskList);
  }, [taskList])

  return (
    <div className="app">
      <div className="main">
        <h1>TODO List</h1>
          <InputGroup className='input-group'>
             <Form.Control className='component'
              placeholder="Task"
              value={enteredItem}
              onChange={event=>setEnteredItem(event.target.value)}
            />
            <Button variant="outline-secondary" onClick={createTask} className='button'>
              Create Task
            </Button>
          </InputGroup>
        </div>
         {taskList.length>0 &&
          <ListGroup className='list-group'>
            <ListGroup.Item className='hidden'/>
            <ListGroup.Item className='list-group-item-head'>
              <button onClick={()=>{setSelected('All')}} className={selected==='All' ? 'selected' : ''}>All</button>
              <button onClick={()=>{setSelected('Active')}} className={selected==='Active' ? 'selected' : ''}>Active</button>
              <button onClick={()=>{setSelected('Completed')}} className={selected==='Completed' ? 'selected' : ''}>Completed</button>
            </ListGroup.Item>
            {displayTaskList.length>0 &&
              displayTaskList.map((data)=>{
                return <Task title={data.taskName} taskStatus={data.taskStatus} 
                            key={data.id} id={data.id} markTask={markTask} deleteTask={deleteTask}/>
              })
            }
            {displayTaskList.length===0 &&
              <ListGroup.Item className='list-group-item-na'>
                No Task Available
              </ListGroup.Item>
            }
            <ListGroup.Item className='hidden'/>
          </ListGroup>
          }
     
    </div>
  );
}

export default App;

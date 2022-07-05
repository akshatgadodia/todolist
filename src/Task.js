import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import './App.css'
import DeleteIcon from '@mui/icons-material/Delete';

const Task = (props) => {
  return (
    <ListGroup.Item className={props.taskStatus ? 'list-group-item checked' : 'list-group-item'}>
        <Form.Check type='checkbox' className='checkbox'   defaultChecked={props.taskStatus}
        onChange={()=>{
          props.markTask(props.id);
        }}
        />
        {props.title}
        <button onClick={()=>{props.deleteTask(props.id)}}><DeleteIcon style={{width:'100%',marginTop:'-10px'}}/></button>
    </ListGroup.Item>
  )
}

export default Task
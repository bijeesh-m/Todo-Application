import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { FaPlus } from "react-icons/fa";
import { addTodo } from "../features/todo/todoSlice";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Todos from "./Todos";
const AddTodo = () => {
    const [input, setInput] = useState("");
    
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const addTodoHandler = (e) => {
        e.preventDefault();
        if (input) {
            dispatch(addTodo(input));
            setInput("");
        } else {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    return (
        <>
            <div className="container">
                <h1>To-Do List</h1>
                <Form className="form" onSubmit={addTodoHandler}>
                    <Form.Control
                        className="input"
                        type="text"
                        value={input}
                        ref={inputRef}
                        placeholder="Add to-do"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit">
                        <FaPlus size={30} />
                    </Button>
                </Form>
                <Todos />
            </div>
        </>
    );
};

export default AddTodo;

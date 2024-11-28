import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaSave } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, removeTodo } from "../features/todo/todoSlice";

const Todos = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [edit, setEdit] = useState("");
    const [id, setId] = useState("");
    const inputRef = useRef(null);
    const todos = useSelector((state) => state.todo.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isEdit) {
            console.log(inputRef.current);
            inputRef.current.focus();
        }
    }, [isEdit]);

    const handleEditBtn = (id, text) => {
        setIsEdit(true);
        setEdit(text);
        setId(id);
    };

    const handleInputChange = (e) => {
        setEdit(e.target.value);
    };

    const handleSave = (id) => {
        if (edit == "") {
            alert("field cannot be empty");
        } else {
            dispatch(editTodo({ id: id, text: edit }));
            setIsEdit(false);
        }
    };

    // !isEdit? "true": todo.id===id?"true":"fkslajlkj"

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id}>
                    {!isEdit ? (
                        <div className="todos">
                            <li className="todo">{todo.text}</li>
                            <li className="delete-btn">
                                <Button variant="none" onClick={() => handleEditBtn(todo.id, todo.text)}>
                                    <FaEdit size={25} />
                                </Button>
                                <Button variant="none" onClick={() => dispatch(removeTodo(todo.id))}>
                                    <FaTrashAlt size={25} color="red" />
                                </Button>
                            </li>
                        </div>
                    ) : (
                        <>
                            {todo.id === id ? (
                                <div>
                                    <div className="todos">
                                        <li className="todo">
                                            <Form.Control
                                                ref={inputRef}
                                                className="editInputBox"
                                                type="text"
                                                defaultValue={todo.text}
                                                onChange={(e) => handleInputChange(e, todo.id)}
                                            />
                                        </li>
                                        <li className="delete-btn">
                                            <Button variant="none" onClick={() => handleSave(todo.id)}>
                                                <FaSave size={25} color="white" />
                                            </Button>
                                            <Button variant="none" onClick={() => dispatch(removeTodo(todo.id))}>
                                                <FaTrashAlt size={25} color="red" />
                                            </Button>
                                        </li>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="todos">
                                        <li className="todo">{todo.text}</li>
                                        <li className="delete-btn">
                                            <Button variant="none" onClick={() => handleEditBtn(todo.id)}>
                                                <FaEdit size={25} />
                                            </Button>
                                            <Button variant="none" onClick={() => dispatch(removeTodo(todo.id))}>
                                                <FaTrashAlt size={25} color="red" />
                                            </Button>
                                        </li>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Todos;

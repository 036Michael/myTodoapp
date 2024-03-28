import React from "react";
import { MdDeleteForever } from "react-icons/md";

const TodoItem = ({ item, setTodoList, deleteTask }) => {
    const toggleTodo = () => {
        setTodoList((prevTodoList) =>
            prevTodoList.map((i) =>
                i.id === item.id ? { ...i, isDone: !i.isDone } : i
            )
        );
    };

    return (
        <li className="hoveredLi">
            <span onClick={toggleTodo} className={item.isDone ? "done" : ""}>
                <div className="date">{item.date}</div>
                {item.todo}
            </span>
            <span onClick={() => deleteTask(item.id)}>
                <MdDeleteForever size={20} />
            </span>
        </li>
    );
};

export default TodoItem;

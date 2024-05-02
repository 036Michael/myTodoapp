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
    const importantColor = () => {
        const expr = item.important;
        switch (expr) {
            case 1:
                return "red";
            case 2:
                return "orange";
            case 3:
                return "yellow";
            case 4:
                return "green";
            case 5:
                return "blue";
            default:
                return "";
        }
    };
    return (
        <li className={`hoveredLi ${importantColor()}`}>
            <span
                onClick={toggleTodo}
                className={item.isDone ? "done" : "notDone"}>
                <div className="date">{item.date}</div>
                <div className="textwrap">{item.todo}</div>
                <span className="tooltiptext">
                    {item.isDone ? "click to done" : "click to not done"}
                </span>
            </span>

            <span onClick={() => deleteTask(item.id)}>
                <MdDeleteForever size={20} />
            </span>
        </li>
    );
};

export default TodoItem;

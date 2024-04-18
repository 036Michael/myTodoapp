import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todoList, selector, deleteTask, setTodoList }) => {
    
    return (
        <div className="todoList_container">
            <ul className="todoList_ul">
                {selector === 1 &&
                    todoList.map((item) => (
                        <TodoItem
                            key={item.id}
                            item={item}
                            setTodoList={setTodoList}
                            deleteTask={() => deleteTask(item.id)}
                        />
                    ))}
                {selector === 2 &&
                    todoList
                        .filter((item) => !item.isDone)
                        .map((item) => (
                            <TodoItem
                                key={item.id}
                                item={item}
                                setTodoList={setTodoList}
                                deleteTask={() => deleteTask(item.id)}
                            />
                        ))}
                {selector === 3 &&
                    todoList
                        .filter((item) => item.isDone)
                        .map((item) => (
                            <TodoItem
                                key={item.id}
                                item={item}
                                setTodoList={setTodoList}
                                deleteTask={() => deleteTask(item.id)}
                            />
                        ))}
            </ul>
        </div>
    );
};

export default TodoList;

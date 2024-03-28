import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import TodoList from "./TodoList";

const Todo = () => {
    const [value, setValue] = useState(""); // 輸入框的值
    const [todoList, setTodoList] = useState([]); // 待辦事項列表
    const [inputError, setInputError] = useState(false); // 輸入框錯誤提示
    const [selector, setSelector] = useState(1); // 選擇器 [1:全部, 2:待辦, 3:已完成]

    // 取得 localStorage 的資料
    useEffect(() => {
        const data = localStorage.getItem("todoList");
        if (data) {
            setTodoList(JSON.parse(data));
        }
    }, []);

    // 新增待辦事項
    const addTask = (e) => {
        e.preventDefault();
        if (!value.trim()) {
            setInputError(true); // 顯示錯誤提示

            // 3 秒後解除錯誤提示
            setTimeout(() => {
                setInputError(false);
            }, 3000);

            alert("請輸入待辦事項!");
        } else {
            setTodoList([
                ...todoList,
                {
                    id: uuid().substring(0, 8),
                    todo: value.trim(),
                    isDone: false,
                    date: new Date().toLocaleString().substring(0, 22), // 日期
                },
            ]);
            setValue("");
        }
    };

    // 添加資料到 localStorage
    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    const deleteTask = (id) => {
        const newTodoList = todoList.filter((item) => item.id !== id);
        setTodoList(newTodoList);
    };

    return (
        <>
            <h2>Todo App</h2>
            <div className="addTask_container">
                <p>What needs to be done?</p>
                <input
                    id="input"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={inputError ? "input_error" : null}
                    placeholder="Add a new task..."
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            addTask(e);
                        }
                    }}
                />
                <button onClick={addTask} id="add_button">
                    {`Add #${todoList.length + 1}`}
                </button>
            </div>

            <ul className="selector">
                {[
                    { id: 1, label: "全部", count: todoList.length },
                    {
                        id: 2,
                        label: "待辦",
                        count: todoList.filter((item) => !item.isDone).length,
                    },
                    {
                        id: 3,
                        label: "已完成",
                        count: todoList.filter((item) => item.isDone).length,
                    },
                ].map((item) => (
                    <li
                        key={item.id}
                        className={selector === item.id ? "active" : null}
                        onClick={() => setSelector(item.id)}>
                        {`${item.label}(${item.count})`}
                    </li>
                ))}
            </ul>
            {/* 使用TodoList組件 */}
            <TodoList
                todoList={todoList}
                selector={selector}
                deleteTask={deleteTask}
                setTodoList={setTodoList}
            />
        </>
    );
};

export default Todo;

import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import TodoList from "./TodoList";
import { IoMdHelpCircleOutline } from "react-icons/io";

const Todo = () => {
    const [value, setValue] = useState(""); // 輸入框的值
    const [todoList, setTodoList] = useState([]); // 待辦事項列表
    const [inputError, setInputError] = useState(false); // 輸入框錯誤提示
    const [selector, setSelector] = useState(2); // 選擇器 [1:全部, 2:待辦, 3:已完成]
    const [important, setImportant] = useState(1); // 重要程度
    const [toggle, setToggle] = useState(true); // 開關 [true:開, false:關

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
        } else if (important === 0) {
            alert("請選擇重要程度!");
        } else {
            setTodoList([
                ...todoList,
                {
                    id: uuid().substring(0, 8),
                    todo: value.trim(),
                    isDone: false,
                    date: new Date().toLocaleString().substring(0, 22), // 日期,
                    important: important,
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

    const importantRate = () => {
        let html = [];
        for (let i = 1; i < 6; i++) {
            html.push(
                <div key={i}>
                    <label htmlFor="important-rate">{i}</label>
                    <input
                        type="radio"
                        name="important-rate"
                        value={i}
                        onClick={() => {
                            setImportant(i);
                        }}
                        checked={important === i}
                    />
                </div>
            );
        }
        return html;
    };

    return (
        <>
            <h2>Todo App</h2>

            <div className="addTask_container">
                <p>What needs to be done?</p>
                <input
                    autoFocus="autofocus"
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
                <fieldset>
                    <legend style={{ position: "relative" }}>
                        <div className="caption-text">重要程度</div>
                        <div className="caption-container">
                            <h4
                                className="caption"
                                onMouseEnter={() => {
                                    setToggle(!toggle);
                                }}
                                onMouseLeave={() => {
                                    setToggle(!toggle);
                                }}>
                                <IoMdHelpCircleOutline />
                            </h4>
                            <span
                                className={
                                    toggle
                                        ? "caption-toggle"
                                        : "caption-toggle-on"
                                }>
                                <li className="red">1 : 非常重要</li>
                                <li className="orange">2 : 重要</li>
                                <li className="yellow">3 : 還好</li>
                                <li className="green">
                                    4 : 目前不重要，緊急的時候開始執行
                                </li>
                                <li className="blue">
                                    5 : 不太重要，但是之後會執行
                                </li>
                            </span>
                        </div>
                    </legend>

                    {importantRate()}
                </fieldset>
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

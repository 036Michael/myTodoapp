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
    const [date, setDate] = useState(""); // 截止日期 [yyyy-mm-dd

    // 取得 localStorage 的資料
    useEffect(() => {
        const data = localStorage.getItem("todoList");
        if (data) {
            setTodoList(JSON.parse(data));
        }
    }, []);

    const expiredDateCount = (date) => {
        let expDateformatted = date.replace(/-/g, "/");
        // let formattedDate = date.replace(/\//g, "-"); //換成 - 格式
        let expDate = new Date(expDateformatted); // 截止日期
        let today = new Date(); // 今天日期

        let timeDifferent = expDate.getTime() - today.getTime();
        let remainingDays = Math.ceil(timeDifferent / (1000 * 3600 * 24)); // 將毫秒轉換為天數並向上取整

        console.log(remainingDays);

        today = today.toLocaleDateString();
        expDate = expDate.toLocaleDateString();

        return { today, expDate, remainingDays };
    };

    const clearAllInput = () => {
        setValue("");
        setDate("");
        setImportant(0);
    };

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
        } else if (date === "") {
            alert("請選擇截止日期!");
        } else if (date < new Date().toISOString().slice(0, 10)) {
            alert("截止日期不可小於今天!");
        } else {
            const { today, expDate, remainingDays } = expiredDateCount(date);

            setTodoList([
                ...todoList,
                {
                    id: uuid().substring(0, 8),
                    todo: value.trim(), // 待辦事項
                    isDone: false, // 是否完成
                    date: today, // 今天日期
                    important: important, // 重要程度
                    expDate: expDate, // 截止日期
                    remainingDays: remainingDays, // 剩餘天數
                },
            ]);
            clearAllInput();
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
                    <label>{i}</label>
                    <input
                        type="radio"
                        name="important-rate"
                        value={i}
                        onChange={() => {
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
                <div className="fieldset-wrapper">
                    <fieldset>
                        <legend>
                            <div className="caption-text">重要程度</div>
                            <div className="caption-container">
                                <span
                                    className="caption"
                                    onMouseEnter={() => {
                                        setToggle(!toggle);
                                    }}
                                    onMouseLeave={() => {
                                        setToggle(!toggle);
                                    }}>
                                    <IoMdHelpCircleOutline />
                                </span>
                                <div
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
                                </div>
                            </div>
                        </legend>

                        {importantRate()}
                    </fieldset>
                    <fieldset>
                        <legend>
                            <div className="caption-text">截止日期</div>
                            <div className="caption-container"></div>
                        </legend>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                            onClick={() => {
                                setDate(date);
                            }}
                        />
                    </fieldset>
                </div>

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

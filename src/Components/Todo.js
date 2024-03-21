import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { MdDeleteForever } from "react-icons/md";

const Todo = () => {
    const [value, setValue] = useState(""); // 輸入框的值
    const [todoList, setTodoList] = useState([]); // 待辦事項列表
    const [inputError, setInputError] = useState(false); // 輸入框錯誤提示
    const [todo, setTodo] = useState([]); // 待辦
    const [done, setDone] = useState([]); // 已完成
    const [selector, setSelector] = useState(1); // 選擇器 [1:全部, 2:待辦, 3:已完成

    const size = 20; // icon size

    // 取得 localStorage 的資料
    useEffect(() => {
        const data = localStorage.getItem("todoList");
        if (data) {
            setTodoList(JSON.parse(data));
        }
    }, []);

    // 待辦事項列表 和 已完成事項列表
    useEffect(() => {
        // 待辦事項列表
        let isTodoList = todoList.filter((item) => {
            return item.isDone === false;
        });
        setTodo(isTodoList);
        // 已完成事項列表
        let isDone = todoList.filter((item) => {
            return item.isDone === true;
        });
        setDone(isDone);
    }, [todoList]);

    // 新增待辦事項
    const addTask = (e) => {
        e.preventDefault();
        if (value === "") {
            const button = document.getElementById("add_button");
            button.disabled = true; // 禁用按鈕
            setInputError(true);

            // 3 秒後解除禁用按鈕和錯誤提示
            setTimeout(() => {
                setInputError(false);
                button.disabled = false;
            }, 3000);
            alert("請輸入待辦事項!");
        } else {
            setTodoList([
                ...todoList,
                {
                    id: uuid().substring(0, 8),
                    todo: value,
                    isDone: false,
                    date: new Date().toLocaleString().substring(0, 21), // 日期
                },
            ]);
            setValue("");
        }
    };

    // 添加資料到 localStorage
    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));

        console.log("保存資料", todoList);
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
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={inputError ? "input_error" : null}
                    placeholder="Add a new task..."
                />
                <button onClick={addTask} id="add_button">
                    {`Add #${todoList.length + 1}`}
                </button>
            </div>

            <ul className="selector">
                <li
                    className={selector === 1 ? "active" : null}
                    id="1"
                    onClick={() =>
                        setSelector(1)
                    }>{`全部(${todoList.length})`}</li>
                <li
                    className={selector === 2 ? "active" : null}
                    id="2"
                    onClick={() => setSelector(2)}>{`待辦(${todo.length})`}</li>
                <li
                    className={selector === 3 ? "active" : null}
                    id="3"
                    onClick={() =>
                        setSelector(3)
                    }>{`已完成(${done.length})`}</li>
            </ul>
            {/* addTask_container end */}

            {/* <h3>{`${todoList.length} Tasks`}</h3> */}
            <div className="todoList_container">
                <ul className="todoList_ul">
                    {selector === 1 &&
                        todoList.map((item) => {
                            return (
                                <li key={item.id} className="hoveredLi">
                                    <span
                                        onClick={() => {
                                            // 點擊待辦事項，切換完成狀態
                                            setTodoList(
                                                todoList.map((i) => {
                                                    if (i.id === item.id) {
                                                        i.isDone = !i.isDone;
                                                    }
                                                    return i;
                                                })
                                            );
                                            // console.log(item.id);
                                        }}
                                        className={item.isDone ? "done" : ""}>
                                        <div className="date">{item.date}</div>
                                        {item.todo}
                                    </span>

                                    <span onClick={() => deleteTask(item.id)}>
                                        <MdDeleteForever size={size} />
                                    </span>
                                </li>
                            );
                        })}
                    {selector === 2 &&
                        todo.map((item) => {
                            return (
                                <li key={item.id} className="hoveredLi">
                                    <span
                                        className="hovered"
                                        onClick={() => {
                                            // 點擊待辦事項，切換完成狀態
                                            setTodoList(
                                                todoList.map((i) => {
                                                    if (i.id === item.id) {
                                                        i.isDone = !i.isDone;
                                                    }
                                                    return i;
                                                })
                                            );
                                        }}>
                                        <div className="date">{item.date}</div>
                                        {item.todo}
                                    </span>

                                    <span onClick={() => deleteTask(item.id)}>
                                        <MdDeleteForever size={size} />
                                    </span>
                                </li>
                            );
                        })}
                    {selector === 3 &&
                        done.map((item) => {
                            return (
                                <li key={item.id} className="hoveredLi">
                                    <span
                                        className="done done_hovered"
                                        onClick={() => {
                                            // 點擊待辦事項，切換完成狀態
                                            setTodoList(
                                                todoList.map((i) => {
                                                    if (i.id === item.id) {
                                                        i.isDone = !i.isDone;
                                                    }
                                                    return i;
                                                })
                                            );
                                            // console.log(item.id);
                                        }}>
                                        <div className="date">{item.date}</div>
                                        {item.todo}
                                    </span>
                                    <span onClick={() => deleteTask(item.id)}>
                                        <MdDeleteForever size={size} />
                                    </span>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
};

export default Todo;

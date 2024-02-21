import React, { useState, useEffect } from "react";
import styles from "./styles/InputComponent.module.css"; // 假設您的樣式文件名為InputComponent.module.css

function InputComponent() {
    const [condition, setCondition] = useState(false);
    const [className, setClassName] = useState("");

    useEffect(() => {
        // 根據條件設置className
        if (condition) {
            setClassName(styles.input_error);
        } else {
            setClassName(styles.input_todo);
        }

        // 設定一個計時器自動清空className
        const timer = setTimeout(() => {
            setClassName("");
        }, 3000); // 3秒後清空className

        // 清理函數
        return () => clearTimeout(timer);
    }, [condition]); // 當condition變化時，重新執行此副作用

    return (
        <div>
            <input className={className} />
            <button onClick={() => setCondition(!condition)}>
                Toggle Condition
            </button>
        </div>
    );
}

export default InputComponent;

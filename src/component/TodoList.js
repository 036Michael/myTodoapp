import { MdDeleteForever } from "react-icons/md";
import React, { memo } from "react";
import styles from "./styles/styles.module.scss";

class TodoList extends React.Component {
    render() {
        console.log("我加了memo，所以我不会再渲染了，除非props改变了");
        return (
            <>
                {this.props.todo.map((item, index) => (
                    <li key={index} id={item.id}>
                        <span>{item.text}</span>
                        <MdDeleteForever
                            onClick={() => this.props.deleteItem(index)}
                            style={{ cursor: "pointer" }}
                            className={styles.icon}>
                            delete
                        </MdDeleteForever>
                    </li>
                ))}
            </>
        );
    }
}

export default memo(TodoList);

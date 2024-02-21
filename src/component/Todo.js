import React from "react";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import styles from "./styles/styles.module.scss";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: "", inputError: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        const items = JSON.parse(localStorage.getItem("todo"));
        if (items) {
            this.setState({ items });
        }
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            // alert("Please enter a task");
            this.setState({ inputError: true }, () => {
                setTimeout(() => {
                    this.setState({ inputError: false });
                }, 2000);
            });
            return;
        }

        this.setState({ inputError: false });

        const id = uuid().substring(0, 8);

        const newItem = { id: id, text: this.state.text };
        this.setState(
            (state) => ({
                items: state.items.concat(newItem),
                text: "",
            }),
            () => this.saveData()
        );
    }

    deleteItem(index) {
        const items = this.state.items.filter((item, i) => {
            console.log(i, index, item);
            return i !== index;
        });
        this.setState({ items }, () => this.saveData());
    }

    saveData() {
        localStorage.setItem("todo", JSON.stringify(this.state.items));
    }

    render() {
        return (
            <>
                <h3 className={styles.title}>TODO</h3>
                <form
                    onSubmit={this.handleSubmit}
                    className={styles.todo_container}>
                    <label>What needs to be done?</label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                        className={
                            this.state.inputError
                                ? styles.input_error
                                : styles.input_todo
                        }
                        placeholder="Add a new task..."
                    />
                    <button>Add #{this.state.items.length + 1}</button>
                </form>

                <h3 className={styles.task_title}>
                    {" "}
                    {this.state.items.length} Tasks
                </h3>

                <ul className={styles.todo_list}>
                    <TodoList
                        todo={this.state.items}
                        deleteItem={this.deleteItem}
                    />
                </ul>
            </>
        );
    }
}

export default Todo;

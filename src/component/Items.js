import React from "react";

export default function Items(props) {
    return (
        <div>
            {props.myList.map((item, index) => (
                <ul key={index}>
                    <li>
                        <span> {item.username}</span>
                        <span>{item.age}</span>
                    </li>
                </ul>
            ))}
        </div>
    );
}

import React from 'react'
import { useState } from 'react'
import Navigation from "./Navigation"
const CreateTask = ({ state }) => {
    const createTask = async (event) => {
        event.preventDefault();
        const { contract, account } = state;
        const taskName = document.querySelector("#taskName").value;
        const taskDate = document.querySelector("#taskDate").value;
        console.log(taskName);
        console.log(taskDate)
        try {
            const res = await fetch("http://localhost:4000/api/ethereum/create-task", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ taskDate: taskDate })
            })
            const data = await res.json();
            console.log("llll", data);
            if (data.status === 200) {
                console.log("lop", account);
                if (contract && contract.methods) {
                    await contract.methods
                        .createTask(taskName, taskDate)
                        .send({ from: account })

                    console.log("broooooooooooooooooo")
                    // setModalContent(`Task ${taskName} added at ${taskDate}`);
                }
            } else {
                alert("Task cannot be added")
            }
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <div>
            <Navigation />
            <form onSubmit={createTask}>
                <label>
                    Name:
                    <input id="taskName" />
                </label>
                <label>
                    Date:
                    <input id="taskDate" />
                </label>
                <button type="submit">Create Task</button>
            </form>
        </div>
    )
}

export default CreateTask
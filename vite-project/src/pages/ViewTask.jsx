import React from 'react'
import { useState, useEffect } from 'react'
import Navigation from './Navigation';
const ViewTask = () => {

    const [task, setTask] = useState([]);
    const viewTask = async (event) => {
        try {
            event.preventDefault()
            const taskID = document.querySelector("#taskID").value;
            const res = await fetch(`http://localhost:4000/api/ethereum/view-taks/${taskID}`,
                // const res = await fetch(`http://localhost:4000/api/ethereum/view-taks/1`,

                {
                    method: "GET",
                    headers: {
                        "contetnt-type": "application/json"
                    }
                });
            const data = await res.json();
            if (data.status === 200) {
                console.log(data.taskObj)
                setTask(data.taskObj)

            } else {
                throw new Error;
            }
        } catch (error) {
            // setModalContent("Task does not exist");
            // setModalVisible(true);
        }
    }
    return (
        <div>
            <Navigation />
            <form action="" onSubmit={viewTask}>
                <label>
                    ID:
                    <input id="taskID" />
                </label>
                <button type="submit">View Task</button>
            </form>

        </div>

    )
}

export default ViewTask
import React from 'react'
import Navigation from './Navigation';

const DeleteTask = ({ state }) => {
    // console.log("ppppp", state.state);
    const { contract, account } = state;
    const deleteTask = async (event) => {
        event.preventDefault();
        // const taskName = document.querySelector("#taskName").value;
        // const taskDate = document.querySelector("#taskDate").value;
        const taskID = document.querySelector("#taskID").value;
        console.log(taskID);
        console.log(account);

        try {
            // const res = await fetch(
            //     "http://localhost:4000/api/ethereum/update-task",
            //     {
            //         method: "POST",
            //         headers: {
            //             "content-type": "application/json"
            //         },
            //         body: JSON.stringify({ taskDate: taskDate })
            //     }
            // // )
            // const data = await res.json();
            // console.log("update", data);
            await contract.methods.deleteTask(taskID).send({ from: account });

            // if (data.status === 200) {
            //     //     setModalContent(
            //     //       `Task ID ${taskID} updated with task name ${taskName} and date ${taskDate}`
            //     //     );
            //     //     setModalVisible(true);
            // } else {
            //     throw new Error("Task cannot be updated because of date clash")
            // }

        } catch (error) {
            console.error(error);
            //   setModalContent("Task cannot be updated");
            //   setModalVisible(true);
        }
    }


    return (
        <div>
            <Navigation />
            <form onSubmit={deleteTask}>
                <label>
                    ID:
                    <input id="taskID" />
                </label>

                <button type="submit">Delete Task</button>
            </form>
        </div>
    )
}

export default DeleteTask
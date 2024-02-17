import React from 'react'
import Navigation from './Navigation'

const UpdateTask = ({ state }) => {





    const { contract, account } = state;
    const updateTask = async (event) => {
        event.preventDefault();
        const taskName = document.querySelector("#taskName").value;
        const taskDate = document.querySelector("#taskDate").value;
        const taskID = document.querySelector("#taskID").value;

        try {
            const res = await fetch(
                "http://localhost:4000/api/ethereum/update-task",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ taskDate: taskDate })
                }
            )
            const data = await res.json();
            console.log("update", data);
            if (data.status === 200) {
                await contract.methods.updatetask(taskID, taskName, taskDate).send({ from: account });
                //     setModalContent(
                //       `Task ID ${taskID} updated with task name ${taskName} and date ${taskDate}`
                //     );
                //     setModalVisible(true);
            } else {
                throw new Error("Task cannot be updated because of date clash")
            }

        } catch (error) {
            console.error(error);
            //   setModalContent("Task cannot be updated");
            //   setModalVisible(true);
        }
    }
    return (
        <div>
            <Navigation />
            <div className="update_task todo_btn">
                <form onSubmit={updateTask}>
                    <label>
                        ID:
                        <input id="taskID" />
                    </label>
                    <label>
                        Name:
                        <input id="taskName" />
                    </label>
                    <label>
                        Date:
                        <input id="taskDate" />
                    </label>
                    <button type="submit">Update Task</button>
                </form>

                {/* {modalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <p>{modalContent}</p>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default UpdateTask
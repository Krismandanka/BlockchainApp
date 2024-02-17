import React from 'react'
import { useState, useEffect } from 'react'
import Navigation from './Navigation';

const ViewAllTask = () => {
    const [taskList, setTaskList] = useState([]);
    console.log("gggggggggggggggggggg");
    // console.log("ppppppppppppp", state);
    useEffect(() => {
        const allTasks = async () => {
            try {

                const res = await fetch("http://localhost:4000/api/ethereum/view-all-task", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                const data = await res.json();
                console.log(data)
                if (data.status === 200) {
                    setTaskList(data.taskList)
                }

            } catch (error) {
                console.error(error);
            }

        }
        allTasks();
    }, [])
    return (
        <div>


            <Navigation />

        </div>
    )
}

export default ViewAllTask
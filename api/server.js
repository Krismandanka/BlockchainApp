0x633b8a3f822950d950dae6f693127528bdfe9c1f

const express = require("express");
const ABI = require("./ABI.json");
const { Web3 } = require("web3");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());


const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/C8wa6KfhIlF81cjuLb2K-Lvn-ZHlhIAk")

const contractAddress = "0x822caee8c58aa2c65ab32df4b83e029f53a3956a";
const contract = new web3.eth.Contract(ABI, contractAddress);

const dateclashCeck = async (taskDate) => {
    const tasks = await contract.methods.allTask().call();
    const foundTask = tasks.find(task => task.date === taskDate);
    if (foundTask) {
        return foundTask.name;
    }
    return "No Task Found";
}

app.post("/api/ethereum/create-task", async (req, res) => {
    // console.log("mmmmm", req.body);
    const { taskDate } = req.body;
    const task = await dateclashCeck(taskDate);
    // const task = await contract.methods.createTask("Solidity", "12/12/12").send({ from: "0x74a5D71d0429bd53aa6DF540Fa0fe558Ff3bb696" });
    try {
        if (task !== "No Task Found") {
            res.status(409).json({
                status: 409,
                message: "Task can not be added"
            })
        }
        else {
            res.status(200).json({
                status: 200,
                message: "Task can be added"
            })
        }

    } catch (error) {
        console.error(error);
    }


})

app.get("/api/ethereum/view-taks/:taskid", async (req, res) => {

    try {
        const { taskid } = req.params;
        const task = await contract.methods.viewtask(taskid).call();
        const { id, name, date } = task;
        const numId = Number(id);
        const taskObj = {
            numId, name, date
        }
        res.status(200).json({
            status: 200,
            taskObj,
            message: "Task Exist"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,

            message: "no single view Task Exist"
        })

    }



})

app.get("/api/ethereum/view-all-task", async (req, res) => {
    try {
        const tasks = await contract.methods.allTask().call();
        if (tasks.length < 0) {
            res.status(400).json({
                status: 400,

                message: "tasklist does not exitt"
            })
        }
        else {
            const taskList = tasks.map(({ id, name, date }) => {
                const taskId = Number(id);
                return { taskId, name, date };
            })
            res.status(200).json({
                status: 200,
                taskList,
                message: "Task all Exist"
            })


        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,

            message: "no all view Task Exist"
        })

    }
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log("SERver is runnig");
})


app.post("/api/ethereum/update-task", async (req, res) => {
    const { taskDate } = req.body;
    const task = await dateclashCeck(taskDate);
    // const task = await contract.methods.createTask("Solidity", "12/12/12").send({ from: "0x74a5D71d0429bd53aa6DF540Fa0fe558Ff3bb696" });
    try {
        if (task !== "No Task Found") {
            res.status(409).json({
                status: 409,
                message: "Task can not be updated "
            })
        }
        else {
            res.status(200).json({
                status: 200,
                message: "Task can be updates"
            })
        }

    } catch (error) {
        console.error(error);
    }
})


import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import CreateTask from './pages/CreateTask';
import DeleteTask from './pages/DeleteTask';
import UpdateTask from './pages/UpdateTask';
import ViewAllTask from './pages/ViewAllTask';
import ViewTask from './pages/ViewTask';
import Wallet from './pages/Wallet';


import Navigation from './pages/Navigation';


function App() {
  // const [state, setState] = useState({ web3: null, account: null, contract: null });
  // const saveState = ({ web31, contract1, account1 }) => {
  //   const up = { web3: web31, account: account1, contract: contract1 }
  //   console.log("accccccccccccc", up)
  //   setState(up);
  //   console.log("stateeeeeeeee", state)
  // }
  const [state, setState] = useState({ web3: null, contract: null, account: null })

  const saveState = ({ web3, contract, account }) => {
    setState({ web3: web3, contract: contract, account: account })
    console.log("pppp", state.account)
  }


  const router = createBrowserRouter([
    { path: "/", element: <Wallet saveState={saveState} /> },
    { path: "/view-all-task", element: <ViewAllTask /> },
    { path: "/create-task", element: <CreateTask state={state} /> },
    { path: "/view-task", element: <ViewTask /> },
    { path: "/update-task", element: <UpdateTask state={state} /> },
    { path: "/delete-task", element: <DeleteTask state={state} /> },

  ])
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App

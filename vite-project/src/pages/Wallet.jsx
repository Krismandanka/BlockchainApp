import React from 'react'
import { Web3 } from "web3";
import { useState } from 'react'
import ABI from "./ABI.json"
import { useNavigate } from 'react-router-dom';

const Wallet = ({ saveState }) => {

    const navigaTo = useNavigate();
    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const account = await window.ethereum.request({
                    method: "eth_requestAccounts"
                })
                console.log(web3, account)

                const contractAddress = "0x822caee8c58aa2c65ab32df4b83e029f53a3956a";
                const contract = new web3.eth.Contract(ABI, contractAddress);
                console.log("connnnnnnnnnnn", contract)
                console.log("accoooooooooo", account[0])
                saveState({ web3: web3, contract: contract, account: account[0] })
                // saveState({ web31: web3, contract1: contract, account1: account[0] })
                navigaTo("/view-all-task");
            }
            else {
                throw new Error
            }
        } catch (error) {
            console.error(error);
        }

    }


    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>

        </div>
    )
}

export default Wallet
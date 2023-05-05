import { useContractReader } from "eth-hooks"
import { Button, Input } from "antd"
import React, { useState } from "react"
import { ethers } from "ethers"
import { Link } from "react-router-dom"

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Staking({ yourLocalBalance, readContracts }) {
    // you can also use hooks locally in your component of choice
    // in this case, let's keep track of 'purpose' variable from our contract
    const purpose = useContractReader(readContracts, "YourContract", "purpose")

    const handleStake = amount => {
        // Send the transaction to the blockchain to stake the specified amount
        console.log(`Staking ${amount} ETH...`)
    }

    const handleWithdraw = amount => {
        // Send the transaction to the blockchain to withdraw the specified amount
        console.log(`Withdrawing ${amount} ETH...`)
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <h1>Staking App</h1>
            <StakingForm onStake={handleStake} />
            <WithdrawForm onWithdraw={handleWithdraw} />
        </div>
    )
}

const StakingForm = ({ onStake }) => {
    const [amount, setAmount] = useState("")

    const handleStake = () => {
        // Validate the amount before submitting the transaction
        if (parseFloat(amount) > 0) {
            onStake(parseFloat(amount))
            setAmount("")
        } else {
            alert("Please enter a valid amount")
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Input
                style={{ width: "200px" }}
                placeholder="Enter amount to stake"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <Button
                style={{
                    width: "100px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    marginLeft: "16px"
                }}
                type="primary"
                onClick={handleStake}
            >
                Stake
            </Button>
        </div>
    )
}

const WithdrawForm = ({ onWithdraw }) => {
    const [amount, setAmount] = useState("")

    const handleWithdraw = () => {
        // Validate the amount before submitting the transaction
        if (parseFloat(amount) > 0) {
            onWithdraw(parseFloat(amount))
            setAmount("")
        } else {
            alert("Please enter a valid amount")
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Input
                style={{ width: "200px" }}
                placeholder="Enter amount to withdraw"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <Button
                style={{
                    width: "100px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    marginLeft: "16px"
                }}
                type="primary"
                onClick={handleWithdraw}
            >
                Withdraw
            </Button>
        </div>
    )
}

export default Staking

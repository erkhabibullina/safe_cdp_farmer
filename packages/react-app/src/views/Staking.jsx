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
    const [amountStaked, setAmountStaked] = useState(0)

    const handleStake = amount => {
        // Send the transaction to the blockchain to stake the specified amount
        console.log(`Staking ${amount} ETH...`)
        setAmountStaked(amountStaked + amount)
    }

    const handleWithdraw = amount => {
        // Send the transaction to the blockchain to withdraw the specified amount
        console.log(`Withdrawing ${amount} ETH...`)
        setAmountStaked(amountStaked - amount)
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
            <AmountStaked amount={amountStaked} />
            <StakingForm onStake={handleStake} />
            <WithdrawForm onWithdraw={handleWithdraw} amountStaked={amountStaked} />
        </div>
    )
}

const AmountStaked = ({ amount }) => {
    return <div style={{ marginBottom: "16px" }}>You staked {amount} ETH.</div>
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

    const handleInputChange = e => {
        const regExp = /^[0-9.]*$/
        if (regExp.test(e.target.value) || e.target.value === "") {
            setAmount(e.target.value)
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Input
                style={{ width: "200px" }}
                placeholder="Enter amount to stake"
                value={amount}
                onChange={handleInputChange}
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

const WithdrawForm = ({ onWithdraw, amountStaked }) => {
    const [amountToWithdraw, setAmountToWithdraw] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleWithdraw = () => {
        // Validate the amount before submitting the transaction
        const parsedWithdrawAmount = parseFloat(amountToWithdraw)
        if (parsedWithdrawAmount > amountStaked) {
            setErrorMessage("You can't withdraw more than you staked")
        } else if (parsedWithdrawAmount > 0) {
            onWithdraw(parsedWithdrawAmount)
            setAmountToWithdraw("")
            setErrorMessage("")
        } else {
            setErrorMessage("Please enter a valid amount")
        }
    }

    const handleInputChange = e => {
        const regExp = /^[0-9.]*$/
        if (regExp.test(e.target.value) || e.target.value === "") {
            setAmountToWithdraw(e.target.value)
            setErrorMessage("")
        }
    }

    return (
        <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Input
                    style={{
                        width: "200px",
                        border: errorMessage ? "1px solid red" : ""
                    }}
                    placeholder="Enter amount to withdraw"
                    value={amountToWithdraw}
                    onChange={handleInputChange}
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
            {errorMessage && (
                <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>
                    {errorMessage}
                </div>
            )}
        </div>
    )
}

export default Staking

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
function Main({ yourLocalBalance, readContracts }) {
    const [amountDeposited, setAmountDeposited] = useState(0)

    const handleDeposit = amount => {
        // Send the transaction to the blockchain to deposit the specified amount
        console.log(`Depositing ${amount} ETH...`)
        setAmountDeposited(amountDeposited + amount)
    }

    const handleWithdraw = amount => {
        // Send the transaction to the blockchain to withdraw the specified amount
        console.log(`Withdrawing ${amount} ETH...`)
        setAmountDeposited(amountDeposited - amount)
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
            <h1>Lending App</h1>
            <AmountDeposited amount={amountDeposited} />
            <DepositForm onDeposit={handleDeposit} />
            <WithdrawForm onWithdraw={handleWithdraw} amountDeposited={amountDeposited} />
        </div>
    )
}

const AmountDeposited = ({ amount }) => {
    return <div style={{ marginBottom: "16px" }}>You deposited {amount} ETH.</div>
}

const DepositForm = ({ onDeposit }) => {
    const [amount, setAmount] = useState("")

    const handleDeposit = () => {
        // Validate the amount before submitting the transaction
        if (parseFloat(amount) > 0) {
            onDeposit(parseFloat(amount))
            setAmount("")
        } else {
            alert("Please enter a valid amount")
        }
    }

    const handleInputChange = e => {
        validateInput(e, () => {
            setAmount(e.target.value)
        })
    }

    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <Input
                style={{ width: "200px" }}
                placeholder="Enter amount to deposit"
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
                onClick={handleDeposit}
            >
                Deposit
            </Button>
        </div>
    )
}

const WithdrawForm = ({ onWithdraw, amountDeposited }) => {
    const [amountToWithdraw, setAmountToWithdraw] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleWithdraw = () => {
        // Validate the amount before submitting the transaction
        const parsedWithdrawAmount = parseFloat(amountToWithdraw)
        if (parsedWithdrawAmount > amountDeposited) {
            setErrorMessage("You can't withdraw more than you deposited!")
        } else if (parsedWithdrawAmount > 0) {
            onWithdraw(parsedWithdrawAmount)
            setAmountToWithdraw("")
            setErrorMessage("")
        } else {
            setErrorMessage("Please enter a valid amount")
        }
    }

    const handleInputChange = e => {
        validateInput(e, () => {
            setAmountToWithdraw(e.target.value)
            setErrorMessage("")
        })
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

const validateInput = (e, callback) => {
    const regex = /^[0-9.]*$/
    if (regex.test(e.target.value) || e.target.value === "") {
        callback()
    }
}

export default Main

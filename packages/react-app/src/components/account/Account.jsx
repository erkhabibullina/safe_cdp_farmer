import { Button } from "antd"
import React from "react"
import { Wallet } from "@web3uikit/icons"
import NetworkSwitch from "./NetworkSwitch"

export default function Account({ address, web3Modal, loadWeb3Modal, logoutOfWeb3Modal }) {
    let accountButtonInfo
    if (web3Modal?.cachedProvider) {
        accountButtonInfo = {
            name: address ? address.slice(0, 6) + "..." + address.slice(-4) : "Logout",
            action: logoutOfWeb3Modal
        }
    } else {
        accountButtonInfo = { name: "Connect wallet", action: loadWeb3Modal }
    }

    const buttonStyle = {
        display: "flex",
        marginLeft: 4,
        borderRadius: "10px",
        border: "none",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 8,
        paddingRight: 8,
        width: 135
    }

    return (
        <div style={{ display: "flex" }}>
            <NetworkSwitch buttonStyle={buttonStyle} />
            {web3Modal && (
                <Button
                    className={"myButton"}
                    style={buttonStyle}
                    onClick={accountButtonInfo.action}
                >
                    <Wallet fontSize="18px" style={{ marginRight: 4 }} />
                    {accountButtonInfo.name}
                </Button>
            )}
        </div>
    )
}

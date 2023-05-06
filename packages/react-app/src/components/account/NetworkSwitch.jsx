import React, { useState } from "react"
import { Button, Menu, Dropdown } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { detectEthereumProvider } from "@metamask/providers"

const supportedNetworks = [
    {
        name: "Ethereum",
        chainId: "0x1",
        rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/GrrphCCtQbnKj1h9cQjskoD-C8Cd6hxi"
    },
    {
        name: "Polygon",
        chainId: "0x89",
        rpcUrl: "https://polygon-rpc.com"
    }
    // Add more networks if needed
]

const switchNetwork = async (chainId, rpcUrl) => {
    const provider = await detectEthereumProvider()

    if (provider) {
        try {
            await provider.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId,
                        rpcUrls: [rpcUrl]
                    }
                ]
            })
        } catch (error) {
            console.error("Error switching network:", error)
        }
    } else {
        console.error("Cannot find Ethereum provider.")
    }
}

const NetworkSwitch = ({ buttonStyle }) => {
    const [currentNetwork, setCurrentNetwork] = useState(supportedNetworks[0].name)

    const handleMenuClick = e => {
        const selectedNetwork = supportedNetworks[e.key]
        setCurrentNetwork(selectedNetwork.name)
        switchNetwork(selectedNetwork.chainId, selectedNetwork.rpcUrl)
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            {supportedNetworks.map((network, index) => (
                <Menu.Item key={index}>{network.name}</Menu.Item>
            ))}
        </Menu>
    )

    return (
        <Dropdown overlay={menu}>
            <Button className={"myButton"} style={buttonStyle}>
                {currentNetwork} <DownOutlined />
            </Button>
        </Dropdown>
    )
}

export default NetworkSwitch

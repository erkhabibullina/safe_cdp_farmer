import React from "react"

const { utils } = require("ethers")

const tryToDisplay = (thing, asText = false, blockExplorer) => {
    if (thing && thing.toNumber) {
        try {
            return thing.toNumber()
        } catch (e) {
            const displayable = "Ξ" + utils.formatUnits(thing, "ether")
            return asText ? (
                displayable
            ) : (
                <span style={{ overflowWrap: "break-word", width: "100%" }}>{displayable}</span>
            )
        }
    }
    if (thing && thing.constructor && thing.constructor.name === "Array") {
        const mostReadable = v =>
            ["number", "boolean"].includes(typeof v) ? v : tryToDisplayAsText(v)
        const displayable = JSON.stringify(thing.map(mostReadable))
        return asText ? (
            displayable
        ) : (
            <span style={{ overflowWrap: "break-word", width: "100%" }}>
                {displayable.replaceAll(",", ",\n")}
            </span>
        )
    }
    return JSON.stringify(thing)
}

const tryToDisplayAsText = thing => tryToDisplay(thing, true)

export { tryToDisplay, tryToDisplayAsText }

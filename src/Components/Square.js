import React from "react";

function Square({text, handleClick, neighbors, setTool}) {
    let finalText;
    if(text === "d" || text==="a") {
        if (neighbors.left !== " " && neighbors.right !== " "&& neighbors.top !== " " && neighbors.bottom !== " ") {
            finalText = " ";
        } else if (neighbors.right === " " || neighbors.left === " ") {
            if (neighbors.top !== " " && neighbors.bottom === " ") {
                if(text==="d") {
                    finalText = (neighbors.right !== " ") ? "L" : "⅃";
                } else {
                    finalText = (neighbors.right !== " ") ? "\\" : "/"
                }

            } else if (neighbors.top === " " && neighbors.bottom !== " ") {
                if(text === "d") {
                    finalText = "_"
                } else {
                    finalText = (neighbors.right !== " ") ? "/" : "\\";
                }
            } else {
                finalText = "|";
            }
        } else {
            if(neighbors.top === " " || neighbors.bottom === " ") {
                finalText = neighbors.top === " " ? "¯" : "_"
            }
        }
    }

    const style = finalText ? {backgroundColor: "rgba(255, 255, 255, 0.03)"} : {};


    const storeCurrentTool = (e) => {
        e.preventDefault();
        setTool(finalText ? finalText : text)
    }


    return (
        <div className="Square"
        onMouseMove = {handleClick}
        onMouseEnter={handleClick}
        style={style}
        onContextMenu={storeCurrentTool}
        >
            <h1>{
                finalText ? finalText : text
            }</h1>
        </div>
    )
}

export default React.memo(Square);
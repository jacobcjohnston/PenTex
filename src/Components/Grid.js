import React, { useEffect, useState } from "react";
import Square from "./Square";

export default function Grid () {
    const [width, height] = [32, 32];

    const [squares, setSquares] = useState([...Array(width * height).fill(" ").join("")]);
    //track if mouse is down
    const [mouseDown, setMouseDown] = useState(false);
    const click = ()  => {setMouseDown(true)};
    const release = ()  => {setMouseDown(false)};

    useEffect(() => {
        window.addEventListener("mousedown", click);
        window.addEventListener("mouseup", release);
        return () => {
            window.removeEventListener("mousedown", click);
            window.removeEventListener("mouseup", release);
        }
    }, []);


    // handle tools
    const [tool, setTool] = useState("d");

    const handleToolChange = (e) => {
        if(e.key === "E" || e.key === "e") {
            setTool(" ")
        } else {
            setTool(e.key);
        }
    }

    useEffect(() => {
        window.addEventListener("keypress", handleToolChange);
        return () => {
            window.removeEventListener("keypress", handleToolChange);
        }
    }, []);

        
    const draw = (pos, char) => {
        const currentState = [...squares]
        currentState[pos] = char;
        setSquares(currentState);
    }

    const findNeighbors = (pos)  => {
        let neighbors;
        if(pos < width) {
            if (pos % width === 0) {
                neighbors = {left: null, right: pos + 1, top: null, bottom:pos+height}

            } else if (pos % width === width-1) {
                neighbors = {left: pos - 1, right: null, top: null, bottom:pos+height}

            } else {
                neighbors = {left: pos - 1, right: pos + 1, top: null, bottom:pos+height}
            }
        } else if (pos > width * height - width){
            if (pos % width === 0) {
                neighbors = {left: null, right: pos + 1, top: pos-height, bottom:null}

            } else if (pos % width === width-1) {
                neighbors = {left: pos - 1, right: null, top: pos-height, bottom:null}

            } else {
                neighbors = {left: pos - 1, right: pos + 1, top: pos-height, bottom:null}
            }
        } else {
            if (pos % width === 0) {
                neighbors = {left: null, right: pos + 1, top: pos-height, bottom:pos+height}

            } else if (pos % width === width-1) {
                neighbors = {left: pos - 1, right: null, top: pos-height, bottom:pos+height}

            } else {
                neighbors = {left: pos - 1, right: pos + 1, top: pos-height, bottom:pos+height}
            }
        }
        
        Object.keys(neighbors).forEach((key) => {

            neighbors[key] = (key) ? squares[neighbors[key]] : null;
         })
         return neighbors;

    }


    return (
        <div className="Grid">
            {squares.map((x, i) => {
                return (<Square
                    key={i}
                    text={x}
                    neighbors={findNeighbors(i)}
                    handleClick={() => {
                        if(mouseDown) {
                            draw(i, tool)
                        }
                    }}
                    setTool = {setTool}
                />);
            })}
        </div>
    )
}
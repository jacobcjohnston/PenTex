import React from "react";

function Sidebar () {
    return (
        <div id="Sidebar-container">
            <h2>PenTex</h2>
            <h3>The Ultimate ASCII Art Maker</h3>
            <button>Copy to Cliboard</button>
        </div>
    );
}

export default React.memo(Sidebar);
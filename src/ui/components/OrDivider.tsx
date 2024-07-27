import React from "react";

function Line() {
    return (
        <div className={"w-[150px] h-0 block select-none border border-white border-solid"} />
    );
}

function OrDivider() {
    return (
        <div className={"flex flex-row justify-between items-center mb-2.5 text-xs select-none"}>
            <Line /> OR <Line />
        </div>
    );
}

export default OrDivider;

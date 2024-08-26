import { useState } from "react";
import "./index.css";
import { ImSpinner9 } from "react-icons/im";


const Loading = () => {
    return(
        <>
            <section className="spinner-body">
                <ImSpinner9 className="spinner"/>
            </section> 
        </>
    );
}

export default Loading;

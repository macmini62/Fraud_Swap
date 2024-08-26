import { useState } from "react";
import "./index.css";
import axios from "axios";
import Loading from "./loading";


const Fraud_Message = ({ fraud, phone_number }) => {

    const [swap_status, set_swap_status] = useState(false);
    const [is_loading, set_is_loading] = useState(false);

    
    const check_swap = () => {
        set_is_loading(true);
        if (swap_status){ set_swap_status(false); }

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "apiKey": "atsk_239e760c8d83565992600f27bb224826718b370dba777b6ef97db562ce6e020038af6132"
        };

        const req_data = {
            "username": "sandbox",
            "phoneNumbers": [phone_number]
        }
    
        axios
            .post("https://cors-anywhere.herokuapp.com/https://insights.sandbox.africastalking.com/v1/sim-swap", req_data, {headers})
            .then((res) => {
                const responses = res.data.responses;
                console.log(responses);
                set_is_loading(false);
                set_swap_status(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const reload_page = () => {
        window.location.reload();
    }


    return(
        <>
            <section className="msg-body">
                <p className="message">
                    {fraud ? "There was a suspicious" : "No suspicious"} activity identified on the transaction.
                </p>
                <div className="actions">
                    {
                        fraud ?
                        <div className="swap-action">
                            <p>Press the button below to check for sim swap activities.</p>
                            <button className="actionbtn" onClick={() => check_swap()}>
                                Click
                            </button>
                        </div>
                        :
                        <div className="swap-action">
                            <p>Press the button below to reload the page.</p>
                            <button className="actionbtn" onClick={() => reload_page()}>
                                Click
                            </button>
                        </div>
                    }
                </div>
            </section>
            { is_loading && <Loading/> }
            {
                swap_status &&
                <section className="swap-message">
                    <p>
                        {phone_number} has been blacklisted.
                    </p>
                </section>
            }
        </>
    );
}


export default Fraud_Message;

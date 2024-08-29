import { useState } from "react";
import "./index.css";
import axios from "axios";
import Loading from "./loading";


const Fraud_Message = ({ fraud, phone_number }) => {

    const [swap, set_swap] = useState({});
    const [is_loading, set_is_loading] = useState(false);

    
    const check_swap = async () => {
        set_is_loading(true);
        if (swap){ set_swap(false); }

        // const headers = {
        //     "Accept": "application/json",
        //     "Content-Type": "application/json",
        //     "ngrok-skip-browser-warning":"*",
        // };
    
        axios
            .get(`http://localhost:6666/proxy/${phone_number}`)
            .then((res) => {
                const responses = res.data;
                console.log(responses);
                set_is_loading(false);

                const date = new Date(res.data.last_swap);
                set_swap({
                        ...res.data,
                        last_swap: date.toLocaleString()
                });
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
                swap &&
                <section className="swap-message">
                    <div>
                        {
                            swap.status == "Swapped" ?
                                <p>{swap.phone_number} has been swapped. Swap date is {swap.last_swap}</p>
                            :
                            swap.status == "NoSwapDate" ?
                                <p>{phone_number} has not been swapped.</p>
                            :
                            swap.status == "Queued" ? 
                                <p>{swap.phone_number} has been queued.</p>
                            :
                            swap.status == "InvalidPhoneNumber" ?
                                <p>Invalid or Unsupported phone number</p>
                            :
                            swap.status == "UnsupportedPhoneNumber" ?
                                <p>Invalid or Unsupported phone number</p>
                            :
                            <p></p>
                        }
                    </div>
                </section>
            }
        </>
    );
}


export default Fraud_Message;

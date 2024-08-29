import { useState } from "react";
import "./index.css";
import axios from "axios";
import Fraud_Message from "./fraud_message";
import Loading from "./loading";
import { IoMdArrowDropup } from "react-icons/io";


const App = () => {

    const [form_data, set_form_data] = useState(
        {   
            phone_number: "",
            transaction_type: "",
            amount: "",
            sender_BT: "",
            sender_AT: "",
            recepient_BT: "",
            recepient_AT: "" 
        }
    );

    const [fraud, set_fraud] = useState(false)
    const [check_fraud, set_check_fraud] = useState(false);
    const [is_loading, set_is_loading] = useState(false);

    const transaction_options = ["Debit","Cash Out","Payment","Transfer"];

    const handle_form_data = (section, event, option) => {
        const value = section != "transaction_type" ? event.target.value : option;
        set_form_data(dt => {
            return{
                ...dt,
                [section]: section == "transaction_type" ? option : value
            }
        });
    }

    const handle_submit = (event) => {
        event.preventDefault();

        const upload_data = {
            ...form_data,
            transaction_type: transaction_options.indexOf(form_data.transaction_type)+1,
            sender_AT: form_data.sender_AT == "" ? `${(+form_data.sender_BT) - (+form_data.amount)}` : form_data.sender_AT,
            recepient_AT: form_data.recepient_AT == "" ? `${(+form_data.recepient_BT) + (+form_data.amount)}` : form_data.recepient_AT 
        }

        set_is_loading(true);

        console.log(upload_data);

        axios
            .post("http://127.0.0.1:5005/sim_swap_check/check_fraud", upload_data)
            .then((res) => {
                const results = res.data.pop();
                results == 1 ? set_fraud(true) : set_fraud(false);
                set_is_loading(false);
                set_check_fraud(true);
            })
            .catch((err) => {
                new Notification("Error occured when uploading data!");
                set_is_loading(false);
                console.log(err);
            })
    }

    return(
        <>
            {
                check_fraud ?
                <Fraud_Message
                    fraud={fraud}
                    phone_number={form_data.phone_number}
                />
                :
                <div className="transaction_body">
                    <header className="bd-header"></header>
                    <div className="bd-content">
                        <h2>Enter Transaction Details Below</h2>
                        <form className="tran_form">
                            <section>
                                <p>Phone Number:</p>
                                <input type="text" placeholder="+2547..." value={form_data.phone_number} onChange={(event) => handle_form_data("phone_number", event, null)}/>
                            </section>
                            <section>
                                <p>Choose type of transaction:</p>
                                <div className="dropdown">
                                    <div className="option">{form_data.transaction_type}</div>
                                    <IoMdArrowDropup className="arrow"/>
                                    <div className="dropdown-content" id="desc_dropdown">
                                        {
                                            transaction_options.map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handle_form_data("transaction_type", null, option)}
                                                >
                                                    {option}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </section>
                            <section>
                                <p>Amount:</p>
                                <input type="number" value={form_data.amount} onChange={(event) => handle_form_data("amount", event, null)}/>
                            </section>
                            <section>
                                <p>Sender account balance B/T:</p>
                                <input type="number" value={form_data.sender_BT} onChange={(event) => handle_form_data("sender_BT", event, null)}/>
                            </section>
                            <section>
                                <p>Sender account balance A/T:</p>
                                <input type="number" value={form_data.sender_AT} onChange={(event) => handle_form_data("sender_AT", event, null)}/>
                            </section>
                            <section>
                                <p>Recepient account balance B/T:</p>
                                <input type="number" value={form_data.recepient_BT} onChange={(event) => handle_form_data("recepient_BT", event, null)}/>
                            </section>
                            <section>
                                <p>Recepient account balance A/T:</p>
                                <input type="number" value={form_data.recepient_AT} onChange={(event) => handle_form_data("recepient_AT", event, null)}/>
                            </section>
                        </form>
                        <button className="submitbtn" onClick={(event) => handle_submit(event)}>Submit</button>
                    </div>
                </div>
            }
            {
                is_loading && <Loading/>
            }
        </>
    )
}


export default App;

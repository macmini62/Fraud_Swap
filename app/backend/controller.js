import fetch from "node-fetch"; // Ensure you have node-fetch installed

export const postData = async (req, res) => {
    try {
        const phone_number = req.params.phoneNumber;
        console.log(phone_number);

        // First request to check the status
        const response = await fetch(`https://a331-41-139-168-163.ngrok-free.app/swap/check/${phone_number}`, {
            method: "GET",
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json", 
                "ngrok-skip-browser-warning": "*"
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const response_data = await response.json();
        console.log(response_data.listen_url);

        // Second request using the listen_url from the first response
        const swapStatus = await fetch(response_data.listen_url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "*"
            }
        });
        
        if (!swapStatus.ok) {
            throw new Error(`HTTP error! status: ${swapStatus.status}`);
        }

        const swap_data = await swapStatus.json();
        console.log(swap_data);

        // Send the successful response back to the client
        res.status(200).send(swap_data);

    } catch (e) {
        console.error(e.message);
        res.status(500).send({ message: "Error in server!" });
    }
};


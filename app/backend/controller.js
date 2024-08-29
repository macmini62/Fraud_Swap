const postData = async(req, res) => {
    try{
        phone_number = await req.params.phoneNumber;
        console.log(phone_number)
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
          else{
            const response_data = await response.json();
            
            console.log(response_data.listen_url);

            const swapStatus = await fetch(`${response_data.listen_url}`, {
                method: "GET",
                headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "*"
                }
            });

            if (!swapStatus.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const swap_data = await swapStatus.json();
            console.log(swap_data);

            res.status(200).send(swap_data);
          }
    }
    catch(e){
        res.status(500).message({ message: "Error in server!" });
    }
}

module.exports = postData;

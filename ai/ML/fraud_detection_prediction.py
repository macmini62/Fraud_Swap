from flask import Flask, render_template
from flask import request
from flask import make_response
from flask_cors import CORS, cross_origin
import csv
from fraud_detection_learning import *

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.get("/")
@cross_origin
def application():
    return("Wait for further instructions!")

# accepts user data from the application.
@app.post("/sim_swap_check/check_fraud")
def post_data():
    input_data = request.json

    for data in input_data:
        if input_data[data] == "":
            return ValueError

    print(input_data)

    data_save(input_data)
    
    model = model_training()

    prediction = model_prediction(model)
    print(prediction)

    return prediction


# saves the users data into a csv file. 
# this will allow the model to predict the inference with respect to the data.
def data_save(input_data):
    test_data = {
        "type": input_data["transaction_type"],
        "amount": input_data["amount"],
        "oldbalanceOrig": input_data["sender_BT"],
        "newbalanceOrig": input_data["sender_AT"],
        "oldbalanceDest": input_data["recepient_BT"],
        "newbalanceDest": input_data["recepient_AT"]
    }

    fieldnames = [field for field in test_data]
    print(test_data)

    with open("test_data.csv", "w", newline="") as td:
        writer = csv.DictWriter(td, fieldnames=fieldnames)

        writer.writeheader()
        writer.writerow(test_data)


if __name__ == "__main__":
    app.run(debug=True, port=5005)

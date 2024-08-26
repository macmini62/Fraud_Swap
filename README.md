# FRAUD DETECTION APPLICATION.
## Project Description.

### Overview
- Application helps to detect fraudulent activities involved in mobile banking transactions. By detecting this activities it also integrates an Insight API from Africastalking that helps detect sim swapping on a users phone number.  
- Sim swapping is a technique greatly used by cyber thieves in order for them to access a user's account. This will help to prevent further transactions from taking place given a sim swap has occured.

### Technologies Used
- In this project I decided to go with Python Language for implementing the Machine Learning techniques in order to develop a ML model that can be able to detect any suspicous activity in each transaction that might take place. Python offers vast libraries that can be utilised in ML which are simple to inplement and start with and hence proved to be a great choice. 
- Flask also provided a good choice for creating the backend for the application.
- React Js was a great choice to use in the frontend section of this project as I wanted to implement a highly reactive application.
- Africastalking Insight API was somoething I had an eye on as this API provides the crucial data you need to make informed decisions and boost your service delivery. This would help detect if a sim card swapping had occured.

## Installation.
- For this project you'll need to have the latest node js version and latest python version.
- Create a virtual environment. execute `python3 -m env myenv` to create the environment. Then execute `source myenv/bin/activate` to start the virtual environment.
- In order to run this application one need several Python libraries:
    * Pandas
    * Seaborn
    * Skicit-learn
    * Imblearn
    * Flask
- First, move to ai/ML and execute: `python3 fraud_detection_prediction.py`. This will start the applications server.
- Second, using a different terminal move to app/frontend and execute `npm run dev` to start the application.


## How to use the application.
- One must have an account at Africastalking. Create an account using https://account.africastalking.com/auth/register
- In the sandbox generate an API token.
- This will be used in the application as it requires the application to have an API token and a username in order to access the Africastalking services.
- After starting your application, click the heroku app cors endpoint. found in app/frontend/fraud_message.jsx. Open the link in the browser to use for the application and enable temporarily acess to the demo. This will allow for CORS accessibility of the application.
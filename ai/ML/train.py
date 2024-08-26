import csv
import sys
import calendar
import numpy as np

# import tensorflow as tf
# import tensorflowjs as tfjs
import tensorflow as tf
from tensorflow import keras

from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn import linear_model, svm
from transformers import AutoTokenizer, TFBertForMaskedLM


TEST_SIZE = 0.5
EPOCHS = 75


def main():
    e, l = load_data()

    # print(f"evidence: {e}")
    # print(f"Labels: {l}")

    X_train, X_test, y_train, y_test = train_test_split(
        np.array(e), np.array(l), test_size=TEST_SIZE
    )
    
    model = get_model()

    # Fit model on training data
    model.fit(X_train, y_train, batch_size=1, epochs=EPOCHS)

    # Evaluate neural network performance
    model.evaluate(X_test,  y_test, verbose=2)
    print(model.weights)

    # Save model to file
    if len(sys.argv) == 2:
        filename = sys.argv[1]
        model.save(filename)
        print(f"Model saved to {filename}.")


def load_data():
    """
    Loads data from the csv file and return it in two lists.
    one list contain the abnormality section as labels of 1 or 0
    and the other list contain the rest of the data in real number values.
    """
    with open("data.csv") as f:
        title_names = [
            "Ref_Number", "Description", "Operation", "Amount", "Recepeint_Name",
            "Recepient_Account", "Time", "Day", "Month", "Year", "Balance", "Location",
            "Device_Ids", "Abnormality"
        ]
        reader = csv.DictReader(f, fieldnames=title_names)
        next(reader)
        data = [dt for dt in reader]

        evidence = [
            "Description", "Operation", "Amount", "Recepient_Account", "Time", 
            "Day", "Month", "Balance", "Location", "Device_Ids", "Abnormality"
        ]

        e = []
        l = []

        for dt in data:
            ev = []
            for d in dt:
                if d in evidence:
                    if d == "Abnormality":
                        if dt[d] == "TRUE": l.append(1)
                        else: l.append(0)
                    elif d == "Operation":
                        if dt[d] == "debit": ev.append(1)
                        else: ev.append(0)
                    elif d == "Description":
                        if dt[d] == "personal": ev.append(0)
                        elif dt[d] == "business": ev.append(1)
                        else: ev.append(2)
                    elif d == "Amount" or d == "Balance" or d == "Recepient_Account":
                        ev.append(int(dt[d])/100000)
                    elif d == "Time":
                        t = dt[d].split(":")
                        hour = int(t[0])
                        minutes = int(t[1])

                        time = ((hour*3600) + (minutes*60)) / (24*3600)
                        ev.append(round(time, 4))
                    elif d == "Month":
                        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                        ev.append(months.index(dt[d])+1)
                    else:
                        ev.append(int(dt[d]))
            e.append(ev)

        return (e, l)


def get_model():
    """
    Creates a Neural Network Model
    """

    model = keras.models.Sequential([
        keras.layers.Dense(8, activation="relu", input_shape=(10, )),
        keras.layers.Dense(4, activation="relu"),
        keras.layers.Dropout(0.5),
        keras.layers.Dense(2, activation="softmax")
    ])

    model.compile(
        optimizer = "adamax",
        loss = "kl_divergence",
        metrics = ["accuracy"]
    )

    return model


if __name__ == "__main__":
    main()

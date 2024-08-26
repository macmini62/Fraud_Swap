#imported packages such as pandas, csv and seaborn
import pandas as pd
import seaborn as sns

# Model evaluations
from sklearn.model_selection import train_test_split

# Models from Scikit-Learn
from sklearn import preprocessing
from sklearn.neighbors import KNeighborsClassifier

# Data Preparation (imbalanced and standardization)
from sklearn.preprocessing import StandardScaler # scaling method
from sklearn.model_selection import RandomizedSearchCV # randomized search cross validation

# example of random undersampling to balance the class distribution
from imblearn.under_sampling import RandomUnderSampler

#settings
pd.options.display.float_format = '{:.2f}'.format


def model_training():
    # DATA EXPLORATION

    # read dataset csv
    df = pd.read_csv("../Datasets/PS_Revised.csv")

    {column: len(df[column].unique()) for column in df.columns} #check number of unique values/non duplicates in all columns
    df = df.drop(['step','nameOrig', 'nameDest'], axis=1)  #as these two columns are non-unique values and are personal identifier ids we remove them
    # both variables label the transactions lets see which one we can use

    le = preprocessing.LabelEncoder()
    df.type = le.fit_transform(df.type) #change categorical into numerical by using label encoder

    #Setting feature vector and target variable
    y = df.isFraud #add target variable Severity to y - dependent variable
    X = df.drop(['isFraud','isFlaggedFraud'], axis=1)  #remove target variable from x features, and rest are features

    # Standardise the X features because the input dataset differs greatly between their ranges an measure
    # in different units of measurement.
    sc = StandardScaler()
    x_scaled = sc.fit_transform(X)

    print(f"X: {X}")

    df3 = pd.DataFrame(x_scaled) #change to dataframe from array that was created in standard scaler function

    df3.columns = X.columns #create column names based on X 

    g = sns.PairGrid(df3[['amount','oldbalanceOrig','newbalanceOrig','oldbalanceDest','newbalanceDest']]) #df3 removing type as categorical variable
    g.map(sns.scatterplot)  #create scatterplot to see the behavior of the features/relationship of features.

    #there is a non-linear relationship between OldbalanceOrg and Oldbalancedest and newbalancedest

    # define undersample strategy
    undersample = RandomUnderSampler(sampling_strategy='majority')
    # fit and apply the transform
    X_over, y_over = undersample.fit_resample(X, y)
    # summarize class distribution
    # print(Counter(y_over))

    X_train, X_test, y_train, y_test = train_test_split(X_over, y_over,test_size=0.5,random_state=1,shuffle=True)
    len(y_train)


    # EXPLORING CLASSIFIERS TO BUILD FINAL ML MODEL.

    # Grid Search KNN 
    # Determining the number of neighbors using RandomizedSearchCV
    param_grid = {'n_neighbors': range(1,20)}
    knn = RandomizedSearchCV(KNeighborsClassifier(), param_grid, verbose=3)
    knn.fit(X_train,y_train)
    
    return knn


def model_prediction(model):
    df = pd.read_csv("test_data.csv")

    le = preprocessing.LabelEncoder()
    df.type = le.fit_transform(df.type) #change categorical into numerical by using label encoder

    # Standardise the X features because the input dataset differs greatly between their ranges an measure
    # in different units of measurement.
    sc = StandardScaler()
    df_scaled = sc.fit_transform(df)
    print(f"df: {df}")

    df3 = pd.DataFrame(df_scaled)
    prediction = model.predict(df3)

    return prediction.tolist()

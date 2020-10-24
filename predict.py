import joblib
import numpy as np


#Testing
loaded_model = joblib.load("model_joblib")

array = sys.argv[1:]
array = list(map(float,array))
#each value represents a feature present in the training set Hint: the users should be able to enter their own values/(or) select from a drop down list of values to make custom predictions
a = np.asarray(array).reshape(1,-1)
predicted_value= loaded_model.predict(a)
print(predicted_value[0])
sys.stdout.flush()


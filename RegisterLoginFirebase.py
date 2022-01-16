# IMPORTANT: Pyrebase only works with some versions of Python (this was tested using Python 3.9.9)
# IMPORTANT: It is necessary to download and install Pyrebase using "pip install pyrebase" in terminal once you have correct python version

# import pyrebase library
import pyrebase

# firebase configuration information (change this to whatever firebase project application you are working with)
# IMPORTANT: all of these attributes need to be present in order for the connection to work (create project -> create web app -> create realtime database -> paste firebase config from project settings)
firebaseConfig = {
    "apiKey": "AIzaSyC0smKAfTO24yVrTc0HXY-Krtch09othQY",
    "authDomain": "userloginregistration-a365f.firebaseapp.com",
    "databaseURL":"https://userloginregistration-a365f-default-rtdb.firebaseio.com/",
    "projectId": "userloginregistration-a365f",
    "storageBucket": "userloginregistration-a365f.appspot.com",
    "messagingSenderId": "586687950561",
    "appId": "1:586687950561:web:b01dfc2b663f64386791a0"
    }

# initialize connection to the firebase project application
firebase = pyrebase.initialize_app(firebaseConfig)

# we want to work with the realtime database in the project
userdb = firebase.database()

# IMPORTANT: add default user entry to database if no existing user entries, default entry is required for functions to work
# username is "null" and password is "123" but it can be anything as long as there is username and password
# comment line below when default user is in database after executing it whenever necessary
#userdb.child("users").child("null").set({"username": "null", "password": "123"})

# this function allows users to register to CodeClass website and have their user login information stored in firebase database
def register(userName, password0, password1):
    # retrieve existing usernames
    userList = []
    all_users = userdb.child("users").get()
    for user in all_users.each():
        userList.append(user.key())
    # checking for user input
    if len(userName) < 1 or len(password0) < 1 or len(password1) < 1:
        print("Username or password must be 1 or more characters. Please try again.")
    # check to see if passwords match when verifying password when creating account
    elif password0 != password1:
        print("Passwords do not match, please try again.")
    # check to see if username already taken in database
    elif userName in userList:
        print("Username already taken, please try again.")
    # add user to database
    else:
        data = {"username": userName,"password": password0}
        userdb.child("users").child(userName).set(data)
        print("Account created successfully.")

# test register function
#register("Chad123", "3200e", "3200e")

# this function checks if user input matches information stored in database to allow users to login to CodeClass website with that user information
def login(userName, password):
    # retrieve existing usernames and passwords and put in key value pair in dictionary
    userDict = {}
    all_users = userdb.child("users").get()
    for user in all_users.each():
        userDict[user.key()] = userdb.child("users").child(user.key()).child("password").get().val()
    # checking for user input
    if len(userName) < 1 or len(password) < 1:
        print("Username or password must be 1 or more characters, please try again.")
    # if username exists and password matches with password associated with that username then 
    # login is successful and user can access website with the account
    elif userName in userDict: 
        for currentUserName in userDict:
            if currentUserName == userName and userDict[currentUserName] == password:
                print("Login successful.")
                break
            elif currentUserName == userName and userDict[currentUserName] != password:
                print("Invalid username or password, please try again.")
                break
    # username does not exist
    else:
        print("Invalid username or password, please try again.")
 
# test login function
#login("Chad123", "3200e")
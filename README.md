# Everswole

Everswole is a clone of Evernote, with a focus on lifting weights. Access the Everswole [here](https://everswole.herokuapp.com/).

# Index
|
[MVP Feature List](https://github.com/scorbz9/everswole/wiki/MVP-Feature-List) |
[Database Schema](https://github.com/scorbz9/everswole/wiki/Database-Schema) |
[API Documentation](https://github.com/scorbz9/everswole/wiki/API-Documentation) |
[Frontend Routes](https://github.com/scorbz9/everswole/wiki/Frontend-Routes) |

# Technologies Used

<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>

# Screenshots of the Application

## Splash Page

![image](https://user-images.githubusercontent.com/63172733/155911557-63217192-a86b-43c0-8cd4-b57da9a08626.png)


## Split Dashboard

![image](https://user-images.githubusercontent.com/63172733/155911519-0532f738-aac7-4493-9f18-f51c67f7544f.png)

## Clone Everswole

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/scorbz9/everswole.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
6. To run the React App, cd into the `react-app` directory.

   ```bash
   npm install
   ```

   ```bash
   npm start
   ```

# Key Functionality Implemented

Everswole allows the user the create a workout day. A day is a list of exercises that the user will perform on a given day. Users can assign a dynamic amount of exercises on a day up to 9. A user can then go back to the day (once they've performed the exercises) and make notes on how they performed relative to their goals or anything else they'd like to remember about how an exercise went for the future. Lastly, a user can delete a day when they no longer need it. 

Everswole additionally allows the user to organize these workout days in a week-long group called a split. A user can place the days they've created on any day, sunday through monday. They can later update these splits if their plans change and they need to move when a workout takes place. Additionally, a user can delete these splits if they no longer need them.

# Features Highlights

## Add/Edit Day Forms - Forms that accept a dynamic amount of inputs
Both the forms for 'add-day' and 'edit-day' features allow the user to submit a dynamic amount of inputs. When adding a day, a user may add or delete inputs from the form, allowing them to choose any amount of exercises they'd like on a given day up to 9. When editing a day, a user is able to add exercises to a day. 

This was achieved using a React state variable holding within it an array of objects, with each object representing a potential input on the form.

![](https://res.cloudinary.com/dzi47txgs/image/upload/v1645930256/everswole_readme1_wfrfqq.png)

The inputs are read onto the form programmatically using a map call on this state variable.

![](https://res.cloudinary.com/dzi47txgs/image/upload/v1645930450/everswole_readme2_yczymd.png)

Two functions control adding or removing objects from this state variable. These functions are used as onClick attributes on user-facing buttons, allowing the user to add or delete exercise inputs from the form as they please.

![](https://res.cloudinary.com/dzi47txgs/image/upload/v1645930552/everswole_readme3_owtzhv.png)

## Add/Edit Split Forms - Select dropdowns exclude options which have already been selected 
When adding or editing a split, the select dropdowns on each form disallow the user from selecting the same day twice on a given split. Once a user makes a selection, that selection is excluded from every other select field. The user would first need to undo this selection in order to move that day elsewhere to another input.

This functionality was achieved using another React state variable, this one holding an array of day id's which are currently selected on the form. 

![](https://res.cloudinary.com/dzi47txgs/image/upload/v1645930907/everswole_readme4_dzl1sz.png)

When an input changes, the id of the day it has been changed to will be added to this React state variable.

![image](https://user-images.githubusercontent.com/63172733/155866387-e04364ce-0f98-47b2-ac2d-a80f5c8d4e6a.png)

Later, when the form programatically reads in options on a given select input using a map call, any of the days which are currently tracked in the 'selected' React state variable will be removed from the dropdown using css.

![image](https://user-images.githubusercontent.com/63172733/155866424-6f33e097-801f-416e-9bf1-48e84fcf5d5f.png)

## Future Implementations
- Allow a user to create/edit/delete their own exercises so they can use more than what is pre-provided for them.
- Allow a user to create an entire split using a customizable template. In one click, the user would be able to create an entire new split with the same sets of exercises on each day based on how they designed the template.

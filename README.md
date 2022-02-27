# Everswole

Everswole is a clone of Evernote, with a focus on lifting weights. Access the Everswole [here.](https://everswole.herokuapp.com/).

# Index
|
[MVP Feature List](https://github.com/scorbz9/everswole/wiki/MVP-Feature-List) |
[Database Schema](https://github.com/scorbz9/everswole/wiki/Database-Schema) |
[API Documentation](https://github.com/scorbz9/everswole/wiki/API-Documentation) |
[Frontend Routes](https://github.com/scorbz9/everswole/wiki/Frontend-Routes) |

# Technologies Used

<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>

## Clone Everswole

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
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

## Deploy to Heroku

1. Before you deploy, don't forget to run the following command in order to
ensure that your production environment has all of your up-to-date
dependencies. You only have to run this command when you have installed new
Python packages since your last deployment, but if you aren't sure, it won't
hurt to run it again.

   ```bash
   pipenv lock -r > requirements.txt
   ```

2. Create a new project on Heroku
3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
4. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
5. Run

   ```bash
   heroku login
   ```

6. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

7. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
8. Push your docker container to heroku from the root directory of your project.
   (If you are using an M1 mac, follow [these steps below](#for-m1-mac-users) instead, then continue on to step 9.)
   This will build the Dockerfile and push the image to your heroku container registry.

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

9. Release your docker container to heroku

      ```bash
      heroku container:release web -a {NAME_OF_HEROKU_APP}
      ```

10. set up your database

      ```bash
      heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
      heroku run -a {NAME_OF_HEROKU_APP} flask seed all
      ```

11. Under Settings find "Config Vars" and add any additional/secret .env
variables.

12. profit

### For M1 Mac users

(Replaces **Step 8**)

1. Build image with linux platform for heroku servers. Replace
{NAME_OF_HEROKU_APP} with your own tag:

   ```bash=
   docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
   ```

2. Tag your app with the url for your apps registry. Make sure to use the name
of your Heroku app in the url and tag name:

   ```bash=2
   docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

3. Use docker to push the image to the Heroku container registry:

   ```bash=3
   docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

**Introduction**  
This guide, with some external content, gives you all keys to set up a webapp with a PostgreSQL database on Heroku.  
I have been inspired by the following youtube video [Build & Deploy A Python Web App | Flask, Postgres & Heroku](https://www.youtube.com/watch?v=w25ea_I89iM) to start working on this guide.  

1. Set up your `flask` app locally
2. Polishing your app
3. Deploy your app to `heroku`


- [Super simple example](https://tempapp123456.herokuapp.com/)
- [Source code](https://github.com/git1984/some.guides/tree/master/webapps/example)  

# 1. Webapp flask structure

## Env creation

- create python env with pipenv module in your app folder:  
`python3 -m venv <myenvname>`  
`source <myenvname>/bin/activate`

The command will create your app environment

- Install the required module in your env  
`pip3 install Flask && pip3 install psycopg2 && pip3 install psycopg2-binary && pip3 install flask-sqlalchemy && pip3 install gunicorn`  

Note:  
**psycopg2** to deal with your Postgres DB. Psycopg is the most popular PostgreSQL database adapter for the Python programming language   
**sqlalchemy** to interact with the sql DB in python  
**gunicorn** is the required http server required when deploying to Heroku   

## Templates setup

- Set up the UI with `templates` and `static`   
Create your css sheet:  
`mkdir templates static && touch static/style.css templates/index.html templates/success.html`

The `templates` folder will store the html. All your pages will be located there  
 
Here is a template code for `index.html`  

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="../static/style.css" />
    <title>Your Title</title>
  </head>

  <body>
    <div class="container">
      <img src="../static/logo.png" class="logo" />
      {% if message %}
      <p class="message">{{ message | safe }}</p>
      {% endif %}
      <form action="/submit" method="POST">
        <div class="form-group">
          <h3>h3 Title</h3>
          <input
            type="text"
            name="name"
            placeholder="name again"
          />
        </div>
        <div class="form-group">
          <h3>h3 title bis</h3>
          <select name="field">
            <option value="">Option 1</option>
            <option value="xx">xx</option>
            <option value="yy">yy</option>
          </select>
        </div>
        <div class="form-group">
          <h3>Please rate</h3>
      <input type="radio" name="rating" value="1" /> 1
      <input type="radio" name="rating" value="2" /> 2
      <input type="radio" name="rating" value="3" /> 3
      <input type="radio" name="rating" value="4" /> 4
      <input type="radio" name="rating" value="5" /> 5
      <input type="radio" name="rating" value="6" /> 6
      <input type="radio" name="rating" value="7" /> 7
      <input type="radio" name="rating" value="8" /> 8
      <input type="radio" name="rating" value="9" /> 9
      <input type="radio" name="rating" value="10" /> 10
        </div>
        <div class="form-group">
          <h3>Comments</h3>
          <textarea
            name="comments"
            id=""
            placeholder="Tell us what you liked"></textarea>
        </div>
        <input type="submit" value="Submit" class="btn" />
      </form>
    </div>
  </body>
</html>     
```  

Note:  

    <form action="/submit" method="POST">

This is the way we communicate with the backend.

Here is a template code for `success.html`  
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="../static/style.css" />
    <title>Your Title</title>
  </head>

  <body><h1>Success</h1>
  </body>
</html>
```

## Python setup

Your flask app start with the `app.py` file, at the route of the directory.  

Here is a template code to initialize the `app.py` without taking care of the DB:   
 
```python
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        name = request.form['name']
        field = request.form['field']
        rating = request.form['rating']
        comments = request.form['comments']
        print(name,field, rating, comments)
        # additional rules to force the user to input a field
        if name == '' or field == '':
            return render_template('index.html', message = 'Please add mandatory info')
    return render_template('success.html')

if __name__ == '__main__':
  app.debug = True
  app.run()
```  

**Now try your script from the console**  
`python3 app.py`  

You will be able to see your app from your browser at the following: `localhost:5000`  

## Postgres setup  

- In the console: `psql`  
Create your DB. `\l` is helpful to check your DBs and assigned owners.  

    `CREATE DATABASE webapp;` 

- In `app.py`, set up your environment & setup your tables:  

```python
# Setup the dev & prod env
ENV = 'dev'

# local database
if ENV == 'dev':
    app.debug = True
    # local database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://yourDBuser@localhost/db_name'

# heroku database
else:
    app.debug = False
    # production database
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create the DB object
db = SQLAlchemy(app)

# Select a model
class Feedback(db.Model):
    # name of your table and columns, adding a key column
    __tablename__ = 'feedback'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True)
    field = db.Column(db.String(200))
    rating = db.Column(db.Integer)
    comments = db.Column(db.Text())

    def __init__(self, name, field, rating, comments):
        self.name = name
        self.field = field
        self.rating = rating
        self.comments = comments
```  

**Note on**: postgres set up.

- List al DBs and owners: `\l`  
- Create database: `CREATE DATABASE db_name;`
- Connect to database:  `\connect db_name`
- List all tables within your database (should be empty at first): `\dt`  

Once your database is up a running, make sure you properly edited your **DB user** and **database name** in the `app.py` script.  
`app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://yourDBuser@localhost/db_name'`  

From the root of the folder, open python from the console and run:  

```shell
from app import db
db.create_all()
exit()
```  

Now, listing all tables will now give you the new table.   
To Get the list of the columns: `SELECT * FROM table_name WHERE false;`   
For now, the table will be empty. You will have to set up the `app.py` code to alter the table.  


You want to edit your code so that every form submission will alter the table. You will have to edit your `submit()` function and add the following when the user submits the form:  
```python
data = Feedback(name, field, rating, comments)
db.session.add(data)
db.session.commit()
```

Now, back to your sql server with `psql`, if you connect to your DB, and select all elements of the `feedback` table, you should be able to access the results of the form.  
- `\c db_name` to connect to your DB  
- `select * from feedback;` to access the results of the `feedback` table  

# 2. Polishing your app

At some point, you might want to polish your app briefly.  
Here is some styling steps:  

- Add the bootstrap CDN in your html `index.html`:  
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
```  

- Add a logo in the `static/style/` folder and give the appropriate name
- Take advantage of the `Bootstrap` pre built classes for your html elements. eg: `<body class="py-4">` 

# 3. Deploy webapp on heroku  

## Set up the `git` repository

- add a `.gitignore` to hide some files such as `__pycache__`  
- initiate your git with `git init` 

## Connect to `heroku`
- connect to heroku with `heroku login`  
- create your app with `heroku create name_of_app`

## Set up your postgreSQL DB and edit your code
- create your postgreSQL DB with `heroku addons:create heroku-postgresql:hobby-dev --app name_of_app`
- fetch and write down your postgreSQL DB address with: `heroku config --app name_of_app` 
- change your python `app.py` code with your new DB url. Also, in `app.py`, change `ENV = 'dev'` to `prod`

## Set up your running environment
- create the `Procfile` with: `echo "web: gunicorn app:app" > Procfile`  
- create the **runtime.txt** file to tell which python version to use, eg: `echo "python-3.6.5" > runtime.txt` 
- create the **requirements.txt** file with the following command: `pip freeze > requirements.txt`  

## Push your app to `heroku` 
- add & commit to git before pushing: `git add . && git commit -m 'init'` 
- push with `git push heroku master`
- access the webapp with `heroku open` 
- set up the tables within the db: `heroku run python` 
    ```python 
    from app import db
    db.create_all()
    exit()  
    ```
- access the db remotely via cmd: `heroku pg:psql --app my_app_name`

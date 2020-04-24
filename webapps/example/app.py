from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Setup the dev & prod env
ENV = 'prod'

if ENV == 'dev':
    app.debug = True
    # local database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://your_user@localhost/your_app_name'
else:
    app.debug = False
    # production database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://'

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
        if name == '' or field == '':
            return render_template('index.html', message='Please enter required fields')
        else:
            data = Feedback(name, field, rating, comments)
            db.session.add(data)
            db.session.commit()
            return render_template('success.html')

if __name__ == '__main__':
  app.run()

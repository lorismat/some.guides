**Introduction:**  
 
This guide aims at creating a telegram bot locally along with a PostgreSQL DB and deploy it to Heroku once ready.  
It consists in a list of steps to follow, based on a very simple example.  

# Theory

Below part is for theoretical purpose only.  

## Webhooks vs. Polling

In this guide, I suggest two main steps.
- Create your bot locally with a **Polling** tecnic (infinite looping) 
- Change it to a **webhook** tecnic when deploying the bot to production (on the heroku server)

## Heroku

Needs:
- `bot.py` which is your core code
- `requirements.txt` which you are freezeing from your current env
- `Procfile` which is specifying the executed script at startup 
- `directory_env` with your python environment

## Telegram Bot Documentation

[pyTelegramBotAPI - Documentation](https://core.telegram.org/api)  
[pyTelegramBotAPI - Github doc](https://github.com/eternnoir/pyTelegramBotAPI)   
[pyTelegramBotAPI - Examples including webhooks](https://github.com/eternnoir/pyTelegramBotAPI/tree/master/examples)   
[Additional library](https://github.com/python-telegram-bot/python-telegram-bot)    
[Official Telegram API Doc](https://core.telegram.org/bots/api)  

# Start

## Create the bot

1. Talk to `@BotFather`
0. `/newbot`
0. `/` ... to edit the description etc.

## Env Set up

**WARNING** give it the same name as your root folder to find it afterwards.

- `python3 -m venv my_env && source my_env/bin/activate`
- `pip3 install pyTelegramBotAPI && pip3 install flask`

IF DB REQUIRED:
- `pip3 install psycopg2 && pip3 install psycopg2-binary && pip3 install flask-sqlalchemy`

THEN:
- `pip3 freeze > requirements.txt && echo "web: python3 bot.py"> Procfile && atom bot.py`

Above steps will create all your env, ready to be pushed later to Heroku.  
Remember:  

`source your_env/bin/activate` to activate your env  
`deactivate` to leave your env  

## Update your code locally

Below code is a code snippet to run your bot locally with the while loop. Before deploying the code to production, you will have to replace the loop with a webhook (see below).  

- **python3 bot.py**

```
import time
import telebot

TOKEN = "XXXXXX_YOURBOTTOKEN_XXXX"
bot = telebot.TeleBot(token=TOKEN)

@bot.message_handler(commands=['start']) # welcome message handler
def send_welcome(message):
bot.reply_to(message, 'Yo!')

@bot.message_handler(commands=['help']) # help message handler
def send_welcome(message):
    bot.reply_to(message, 'Mmmmh...')

#below code is only to set up the bot locally
while True:
    try:
        bot.polling(none_stop=True)
        # ConnectionError and ReadTimeout because of possible timout of the requests library
        # maybe there are others, therefore Exception
    except Exception:
        time.sleep(15)
```  

- **Database setup** - If you want to, create the bot along with a PostgreSQL DB, here is a code snippet to help you with:  

```
# Setup the dev & prod env of the DB
ENV = 'prod'

if ENV == 'dev':
    server.debug = True
    # local database
    server.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localuser@localhost/localdb'
else:
    server.debug = False
    # production database, given with the following command: heroku config --app name_of_app   
    server.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://postgresDBaddress'

server.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create the DB object
db = SQLAlchemy(server)

# Select a model
class Messages(db.Model):
    # name of your table and columns, adding a key column
    __tablename__ = 'name_given_to_your_table'
    id = db.Column(db.Integer, primary_key=True)
    comments = db.Column(db.Text())
    #below are your columns to define, here only the "comments" column, fetching the messages
    def __init__(self, comments):
        self.comments = comments

    def __repr__(self):
        return '<Comment %r>' % self.comments
####
```
**To create and initiate the table, you will be hable to do the following** in a Python console:  
```
from bot import db
db.create_all()
exit()
```
## Heroku Set up

Here, while deploying to Heroku, you will have to remove the `while` loop and work with webhooks. Replace the loop by the following:  

```
#### Heroku server setup, to be removed in sandbox ####
@server.route('/' + TOKEN, methods=['POST'])
def getMessage():
    bot.process_new_updates([telebot.types.Update.de_json(request.stream.read().decode("utf-8"))])
    return "!", 200

@server.route("/")
def webhook():
    bot.remove_webhook()
    # prod, url being your Heroku app url
    #bot.set_webhook(url='https://your-app-name.herokuapp.com/' + TOKEN)
    return "!", 200

if __name__ == "__main__":
    server.run(host="0.0.0.0", port=int(os.environ.get('PORT', 5000)))
####
```

## Heroku set up and deployment
- `heroku login`

Once the link of the app is created, you have to copy/paste it in the `bot.py` code  
and... copy/paste your app token!

- `git init && git add . && git commit -m "first commit"`
- `heroku create`
- if database:  
`heroku addons:create heroku-postgresql:hobby-dev --app name_of_app`  
- `git push heroku master` 

**Note after first push**.  
Fetch your config. `heroku config --app name_of_app` to get the name of the DB (to be pasted).  

Once you fetched your config, replace the required in your code.  
`server.config['SQLALCHEMY_DATABASE_URI']`  
`bot.set_webhook(url='https://pure-.herokuapp.com/' + TOKEN)`  
 
Then push. Then create the DB. Then run the app!  

- if in logs: `Stopping all processes with SIGTERM` then: `heroku ps:scale web=1 #to start dynos`

**CONNECT TO THE APP via link**

Reiteration:
- `git add . && git commit -m "first commit" && git push heroku master # future depl`

& connect to the app directly: `heroku open`

## DB Set up

- `heroku run python` and then DB creation:
- in python:
```
from bot import db
db.create_all()
exit()
``` 

Access the DB:

`heroku pg:psql --app my_app_name`



## Check the logs

- `heroku logs -t #live`

## Reiterating

- From Heroku to local: `bot.delete_webhook()`
- Comment & Uncomment prod/sandbox parts

## Post Deployment with interactions

**To improve!**
Let's admit that your bot is expecting a list from the user. At some point, you wont to get the data back.

You will pull the repository instead of editing locally and pushing back.

## Style your bot  

`bot.send_message(message.chat.id,"""HTML CODE""",parse_mode='html')`  
`bot.send_message(message.chat.id,"""MARKDOWN CODE""",parse_mode='markdown')`

## Design vs. Prod  
Once the bot is in production, it is recommended to create a second bot (and generate a second token) to run the code locally to develop new features.  


## About Webhooks

Webhooks is expecting an action from the user. With Heroku, if no action is submitted within 30minutes (free plan), the bot will go Idle:

```
2020-02-18T11:12:33.199148+00:00 heroku[web.1]: Idling
2020-02-18T11:12:33.203195+00:00 heroku[web.1]: State changed from up to down
2020-02-18T11:12:36.047281+00:00 heroku[web.1]: Stopping all processes with SIGTERM
2020-02-18T11:12:36.144460+00:00 heroku[web.1]: Process exited with status 143
2020-02-18T12:22:29.625160+00:00 heroku[web.1]: Unidling
2020-02-18T12:22:29.641255+00:00 heroku[web.1]: State changed from down to starting
2020-02-18T12:22:33.084270+00:00 heroku[web.1]: Starting process with command `python3 bot.py````  

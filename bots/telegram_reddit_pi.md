**Introduction:**  
 
This guide aims at creating a telegram bot locally to get alerts from Reddit. In this guide, the bot is deployed on a raspberry to be up and running 24/7.  
It consists in a list of steps to follow, based on a very simple example.  

# Start
 
## Create the bot

1. Talk to `@BotFather`
0. `/newbot`
0. `/` ... to edit the description etc.

# Locally

## env setup

`python3 -m venv my_env`  
`source my_env/bin/activate`  

## Additionnal setup, not necessarily required for the raspberry

- `python3 -m venv my_env && source my_env/bin/activate`
- `pip3 install python-telegram-bot && pip3 install requests && pip3 install pytz`
- `pip3 freeze > requirements.txt` 

## Editing the code

**TO BE EDITED**

```
import time
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, ConversationHandler
import requests
import datetime
import json
import pytz
from time import strftime,localtime

moment_now = strftime("%A, %d %b %Y", localtime())

#telegram secret
updater = Updater(token='XXXXX_YOURTELEGRAMTOKEN_XXXXX', use_context=True)

def start(update, context):
    while True:
        time.sleep(10)
        x = strftime("%H-%M", localtime())
        #you would define below the day you want to get the alert
        if (x == '20-40') or (x == '20-45') or (x == '06-50'):
            #### REDDIT ####
            subreddit = 'your_sub_name'
            #below is the number of posts and query
            limit = 3
            t = 'day'
            url = str('https://www.reddit.com/r/%s/top.json?t=%s&limit=%s'%(subreddit,t,limit))
            #below, pass your user agent to let the reddit API who you are
            r = requests.get(url,headers={'User-Agent': 'YOUR USER AGENT'})
            data = r.json()
            for i in range(0,3):
                time.sleep(1)
		#parsing your post
                new_post = str('www.reddit.com'+data['data']['children'][i]['data']['permalink'])
		#sending to telegram
                context.bot.send_message(chat_id=update.effective_chat.id, text=new_post)
            time.sleep(6)

updater.dispatcher.add_handler(CommandHandler('start', start))
updater.start_polling()
updater.idle()
```

# Move code to Pi

You might not need to do anything (apart from creating the env)

- Sending files  
`scp -r my_folder/ pi@your_pi_ip:/your/target/folder`
- Activate env
`source my_env/bin/activate`
- Install from requirements.txt
`pip3 install -r requirements.txt`

# Note on ssh and passive program

- `nohup long-running-command &` to execute the code in the back (will keep on running after exiting the session)
- `ps -ax` to see the list of processes, `ps -ax | grep python3` to see all programs running with python3
- `kill 9 <your app id>` to kill processes

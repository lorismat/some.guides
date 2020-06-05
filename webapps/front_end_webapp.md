**Introduction**  
This guide, with some external content, gives you some hints on how I built a very simple front-end webapp with `D3.js`  
I have been inspired by the following [website, d3-graph-gallery](https://www.d3-graph-gallery.com/intro_d3js.html), by Yan Holtz, teaching the basic of `D3.js`. Of course, it comes with a lot of credits to [Mike Bostock](https://bost.ocks.org/mike/), the `D3.js` creator.   

1. A quick look at the javascript code 
2. What I learnt on the way 
3. Side note on the web server
 
# 1. A quick look at the javascript code

# 2. What I learnt on the way

- JS g element to group shapes together
- JS eventListener
- JS various loops including forEach
- JS variables to be defined in the proper place
- JS to get data on the user device (including screen size)
- CSS border with pictures
- CSS z-index, position

# 3. Side note on the web server

## Locally

With all files in the same directory, you can work on your front-end app with the simplest python server as follow `python3 -m http.server`  

## Heroku 

Once satisfied with your webapp, you can set up a very simple `Flask` app ready to be deployed to `Heroku` for instance. [Here is a guide](https://github.com/git1984/some.guides/blob/master/webapps/webapp_to_heroku.md) to help you with it!  


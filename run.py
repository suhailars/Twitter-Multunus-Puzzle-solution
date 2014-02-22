from twython import Twython, TwythonError, TwythonRateLimitError
from flask import Flask, flash, redirect, render_template, url_for
import psycopg2
import re
import time

#mapping tweet_id  to handle
tweetidMap = (('github',  434396070261829633),
			  ('timoreilly', 436988766335815680),
			  ('twitter',  430209046017089537),
			  ('martinfowler', 436639022367399938),
			  ('dhh',  436919863106605057),
			  ('gvanrossum', 436672512684879872),
			  ('BillGates',  436893461883924481),
			  ('spolsky', 436683216196734976),
              ('firefox', 436923332089229312))

#authentication

twitter = Twython(app_key='Qz1jB0SWo95w2dk6M0wq9w',
            app_secret='QpVQvo25OUExLWZVxQvYezTtnW82XxDo9jm0WySH6Kw',
            oauth_token='99002742-FkMoUWMTJE5Dk6JsyNyprCUOBYwcT541wkXg4I6OZ',
            oauth_token_secret='fu3p6rYVqQvBwkhIjssCAeugfyRkrbEpLdJgiWsh0aavo')


app = Flask(__name__)
app.secret_key = 'some_secret'
@app.route('/')
def home():
	return render_template('home.html')
@app.route('/<imagename>')
def gallery(imagename=None):   
    match = re.search(r'\w+', imagename)
    user=match.group() 
    try:
     username_list={}
     for handle, ids in tweetidMap:
         if handle == user:
           retweeters=twitter.get_retweets(id=ids,count=10)
           for tweet in retweeters:
                 username_list[tweet['user']['profile_image_url_https']]=tweet['user']['followers_count']
   

     def get_count(a):
        return a[1] 

     items = sorted(username_list.items(), key=get_count, reverse=True)
     items=items[:10]
     posts=[] 
  	
     for i in items:
            posts.append(dict(image_url=i[0],count=i[1]))
      
     imagename='img/'+imagename 
     imagename=imagename.encode('utf-8')
     posts.insert(0,imagename)     
     return render_template('circle3.html',posts=posts)
    except TwythonRateLimitError,TwythonError:
             flash("try after  some time")
             return render_template('rate.html')
             

if __name__ == "__main__":
 app.run(debug = True)





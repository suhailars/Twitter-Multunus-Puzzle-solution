from twython import Twython
from flask import *
import psycopg2
import re

#mapping tweet_id  to handle
tweetidMap = (('github',  433346627714023425),
			  ('timoreilly', 434542111556653056),
			  ('twitter',  428602381920514048),
			  ('martinfowler', 433267305544302593),
			  ('dhh',  434032343847026688),
			  ('gvanrossum', 434600796462673920),
			  ('BillGates',  432924919807344641),
			  ('spolsky', 434303745032478720),
              ('firefox', 434741424639049728))

#authentication

twitter = Twython(app_key='Qz1jB0SWo95w2dk6M0wq9w',
            app_secret='QpVQvo25OUExLWZVxQvYezTtnW82XxDo9jm0WySH6Kw',
            oauth_token='99002742-FkMoUWMTJE5Dk6JsyNyprCUOBYwcT541wkXg4I6OZ',
            oauth_token_secret='fu3p6rYVqQvBwkhIjssCAeugfyRkrbEpLdJgiWsh0aavo')


app = Flask(__name__)
@app.route('/')
def home():
	return render_template('home.html')
@app.route('/<imagename>')
def gallery(imagename=None):
        
    match = re.search(r'\w+', imagename)
    user=match.group() 

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
          
  
app.run(debug = True)





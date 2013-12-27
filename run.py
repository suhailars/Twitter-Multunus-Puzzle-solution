from twython import Twython
from flask import *
import psycopg2
import re
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
	followers = twitter.get_followers_ids(screen_name =user,count=10)
	username_list={}

	for i in followers[u'ids']:
  		output=twitter.show_user(user_id=i) 
  		username_list[output['profile_image_url_https']]=output['followers_count']

	def get_count(a):
    	 return a[1] 

	items = sorted(username_list.items(), key=get_count, reverse=True)
	items=items[:10]
        posts=[] 
  	#posts=[dict(id=i[0],author=i[1],post=i[2])
        for i in items:
            posts.append(dict(image_url=i[0],count=i[1]))
        #print posts
        imagename='img/'+imagename 
        imagename=imagename.encode('utf-8')
        posts.insert(0,imagename)
          
        return render_template('circle3.html',posts=posts)
          
  
app.run(debug = True)





import requests,json,time,sys
from pathlib import Path
from datetime import datetime
import logging

AID='wxf3a5cfe4b1f4255f'
AS='df208295c514baab71b86bb38eafa884'
AD=Path('/opt/wechat-publisher/articles')
LF=Path('/opt/wechat-publisher/logs/publish.log')
PL=Path('/opt/wechat-publisher/logs/published.json')
logging.basicConfig(level=logging.INFO,format='%(asctime)s - %(levelname)s - %(message)s',handlers=[logging.FileHandler(LF),logging.StreamHandler()])
L=logging.getLogger(__name__)

class W:
  def __init__(s): s.t=None; s.e=0
  def gt(s):
    if s.t and time.time()<s.e: return s.t
    r=requests.get('https://api.weixin.qq.com/cgi-bin/token',params={'grant_type':'client_credential','appid':AID,'secret':AS},timeout=30).json()
    if 'access_token' in r: s.t=r['access_token']; s.e=time.time()+r.get('expires_in',7200)-300; L.info('Token OK'); return s.t
    L.error(f'Token fail: {r}'); return None
  def un(s,a):
    t=s.gt()
    if not t: return None
    return requests.post('https://api.weixin.qq.com/cgi-bin/material/add_news',params={'access_token':t},json={'articles':a},timeout=60).json().get('media_id')
  def pd(s,m):
    t=s.gt()
    if not t: return False
    return requests.post('https://api.weixin.qq.com/cgi-bin/freepublish/submit',params={'access_token':t},json={'media_id':m},timeout=60).json().get('errcode')==0

def load_articles():
  if not AD.exists(): return []
  articles=[]
  for f in sorted(AD.iterdir()):
    if f.suffix.lower() in ['.md','.txt']:
      try: articles.append({'path':f,'title':f.stem,'content':f.read_text(encoding='utf-8')})
      except: pass
  return articles

def load_published():
  if PL.exists():
    try: return json.loads(PL.read_text(encoding='utf-8'))
    except: return []
  return []

def save_published(logs):
  PL.write_text(json.dumps(logs,ensure_ascii=False,indent=2),encoding='utf-8')

def publish_article(publisher,article):
  L.info(f'Publishing: {article["title"]}')
  articles_data=[{'title':article['title'],'thumb_media_id':'','author':'碳纤维材料专家','digest':article['content'][:100]+'...','show_cover_pic':0,'content':article['content'].replace('\n','<br>'),'content_source_url':'','need_open_comment':1,'only_fans_can_comment':0}]
  media_id=publisher.upload_news(articles_data)
  if not media_id: return False
  return publisher.publish_draft(media_id)

def test_token():
  L.info('Testing token...')
  publisher=W()
  token=publisher.get_access_token()
  if token: L.info(f'Token OK: {token[:20]}...'); return True
  else: L.error('Token failed'); return False

def main():
  L.info('WeChat Auto Publish Start')
  publisher=W()
  articles=load_articles()
  if not articles: L.warning('No articles'); return
  published=load_published()
  published_titles={p['title'] for p in published}
  success=0
  for article in articles:
    if article['title'] in published_titles: L.info(f'Skip: {article["title"]}'); continue
    if publish_article(publisher,article):
      published.append({'title':article['title'],'path':str(article['path']),'published_at':datetime.now().isoformat()})
      save_published(published)
      success+=1
      time.sleep(5)
  L.info(f'Done: {success}/{len(articles)} success')

if __name__=='__main__':
  if len(sys.argv)>1 and sys.argv[1]=='--test': test_token()
  else: main()

css=open('style.css').read();data=open('data.js').read();js=open('app.js').read()
html=f'''<!DOCTYPE html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Architecture logbook</title><meta name="theme-color" content="#F3EEE4">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..600,0,1&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>{css}</style></head><body>
<div id="app"><main id="view" tabindex="-1"></main><div id="bar" class="actionbar" hidden></div><nav id="tabs" aria-label="Main"></nav><div id="toast" role="status" aria-live="polite"></div></div>
<noscript>This app needs JavaScript.</noscript>
<script>{data}</script><script>{js}</script></body></html>'''
assert '</script>' not in data and '</script>' not in js
open('index.html','w').write(html);print(len(html))
import os
key=open('maps_key.txt').read().strip() if os.path.exists('maps_key.txt') else ''
hosted=html.replace('<script>const B=','<script>window.GOOGLE_MAPS_KEY="'+key+'";</script><script>const B=',1)
open('architecture-logbook-google-maps.html','w').write(hosted)
os.makedirs('site',exist_ok=True);open('site/index.html','w').write(hosted)

# phone app build (wrapped with Capacitor): no demo data, real location, no page zoom
native=hosted.replace('<meta name="viewport" content="width=device-width,initial-scale=1">','<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">',1).replace('<script>window.GOOGLE_MAPS_KEY','<script>window.NATIVE_APP=true;window.GOOGLE_MAPS_KEY',1)
assert 'NATIVE_APP=true' in native and 'viewport-fit=cover' in native
os.makedirs('native/www',exist_ok=True);open('native/www/index.html','w').write(native)

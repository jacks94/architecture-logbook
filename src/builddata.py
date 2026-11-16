import json,re
L='/home/claude/london/'
d=json.load(open(L+'london-architecture-cards.json'))
m1=json.load(open(L+'meta.json')); m2=json.load(open(L+'v2/meta.json'))
alias={'Tower of London':'Tower of London (White Tower)','St Pancras':'St Pancras Station and Midland Grand Hotel','Isokon Building':'Isokon Building (Lawn Road Flats)','Highpoint I':'Highpoint I and II','Barbican Estate':'Barbican Estate and Arts Centre','The O2 (Millennium Dome)':'Millennium Dome (The O2)','City Hall':"City Hall (Queen's Walk)","Google King's Cross (KGX1)":"Google King's Cross (Platform 37)"}
names={r['Building']:int(r['No.']) for r in d}
D={}
attr=re.compile(r' (fill="none"|stroke="#1D1B17"|stroke-width="1\.3"|stroke-linecap="round"|stroke-linejoin="round")')
left=set()
for m,dirn in ((m1,'svg/'),(m2,'v2/svg/')):
    for x in m:
        s=open(L+dirn+x['file']).read()
        inner=re.sub(r'^<svg[^>]*>|</svg>\s*$','',s.strip())
        inner=attr.sub('',inner)
        for a in re.findall(r' ([a-z\-]+)="',inner): left.add(a)
        D[names[alias.get(x['title'],x['title'])]]=inner
print('attrs left',left,len(D))
def year(y):
    m=re.search(r'\d{3,4}',y)
    if m: return int(m.group())
    m=re.search(r'(\d+)(st|nd|rd|th)',y)
    return (int(m.group(1))-1)*100 if m else 0
B=[]
for r in d:
    src=[s.strip() for s in re.split(r'\s*;\s*',r['Sources']) if s.strip()]
    B.append(dict(n=int(r['No.']),name=r['Building'],style=r['Classification'],sum=r['Summary'],about=r['About'],arch=r['Architect'],years=r['Years'],done=r['Completed'],listed=r['Listed'],awards=r['Awards'],mat=r['Material'],street=r['Street'],boro=r['Borough'],why=r['Why it matters'],type=r['Type'],era=r['Era'],lat=round(float(r['Latitude']),6),lng=round(float(r['Longitude']),6),y=year(r['Years']),src=src,fc=r['Fact check'],pin=r['Pin check']))
print([ (b['name'],b['years']) for b in B if b['y']==0][:10])
open('data.js','w').write('const B='+json.dumps(B,ensure_ascii=False,separators=(',',':'))+';\nconst D='+json.dumps(D,separators=(',',':'))+';\n')
import os;print(os.path.getsize('data.js'))
print(max(len(b['name']) for b in B), [b['src'][:2] for b in B[:2]], B[0]['years'])

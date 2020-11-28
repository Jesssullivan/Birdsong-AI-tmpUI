
## Web:

*Hack on Web Interpreter:*

```
# Clone:
git clone --branch=master --depth=1 https://github.com/Jesssullivan/merlin_ai && cd merlin_ai/deploy/

# Follow the prompts to setup node and python:
npm run-script develop-web-demos
```

<table>
  <thead>
    <tr>
      <th>
        <a href="https://merlinai.herokuapp.com/"><img src="./icons/tmpUI.MerlinAI-favicon-dark/android-chrome-192x192.png" alt="demos"></a> <br/> <em> Visit audio  demos on Heroku </em>
      </th>
        <th>
        <a href="https://merlinai.herokuapp.com/leaflet_audio"><img src="./icons/Leaflet.annotation-favicon-dark/android-chrome-192x192.png" alt="demos"></a> <br/> <em> Visit Leaflet.annotation demos on Heroku </em>
      </th>
      <th>
        <a href="https://youtu.be/rKzl5aQmJ-Y"><img src="https://img.youtube.com/vi/rKzl5aQmJ-Y/default.jpg" alt="Leaflet.annotation"></a>
         <br/><em> Watch Leaflet.annotation demo here </em>
      </th>
        <th>
        <a href="https://youtu.be/TOQyuZDOrJA"><img src="https://img.youtube.com/vi/TOQyuZDOrJA/default.jpg" alt="setup prompt"></a>
         <br/><em> Watch environment setup here </em>
      </th>
    </tr>

  </thead>
</table>



| Demo | Description |
|-----------|-------------|
| [demos/spec_crop_interpreter](./demos/)  | record, crop & interpret. automatically determines client-side or server-side classification method. |
| [demos/webgl_init](./demos/) | Evaluate web client's capability for classification |
|  [demos/annotator_audio](./demos/) | Leaflet.annotator tool implementations for generating, labeling, exporting mel spectrogams as annotation data |
|  [demos/annotator_photo](./demos/) | Leaflet.annotator tool implementations for labeling &  exporting photo annotations |


#### Notes:

```
## setup ##

# Node:
npm install

# Venv:
python3 -m venv merlinai_venv
source merlinai_venv/bin/activate

# Python:
pip3 install -r requirements.txt

# Launch:
npm run-script develop-web-demos

```

*Configure Flask in `config.py`:*

```
# config.py

# `True` serves demos @ 127.0.0.1:5000 via node proxy (set `False` for production @ 0.0.0.0:80)
devel = True

# rebuild header + demo + footer html renders before serving anything (set `False` for production):
prerender = True

```
- `/` runs `webgl_init`, which figures out if the browser can or cannot make classifications and routes the client accordingly.
    - *classification options:*
    - if browser cannot do classification (i.e. safari on mobile, webgl mediump not supported) recording is beamed up to `/uploader_standard` for processing
    - both POST destinations `/uploader_select` & `/uploader_standard` can also be operated from within browser as a multipart form


***requirements.txt:***      
- tf-nightly causes Heroku slug size to be too big:
  - use cpu-only tensorflow for deployment
  - (dependabot may get upset)
- on Heroku, `numpy~=1.18.**` is still a reverse depend of cpu-only tensorflow 2.3.*
  -  otherwise, stick with whatever `tf-nightly` calls for, e.g.`numpy>=1.19.2`



## Scripts:

```
# See ./package.json & ./scripts/ for additional scripts
```


#### *Hack on Annotator:*
```
#### develop-anno-demos:

# packs annotator demos
# generates unique openssl cert & key
# serves annotator demos on node http-server

npm run-script develop-anno-demos
```

```
# pack only tool definitions @ `./src/annotator_tool.js:
npm run-script build-anno-tool

# pack only implementations of audio annotator @ `./demos/annotator_audio.ts:
npm run-script build-anno-audio

# pack only implementations of photo annotator @ `./demos/annotator_photo.ts:
npm run-script build-anno-photo
```


#### *removing stuff:*    

```
# clean up with:
npm run-script clean all
# ...and follow the instruction prompt

# ...demo bundles:
npm run-script clean-web-bundles

# ...demo renders:
npm run-script clean-web-renders
```

#### *local ssl:*
```
# Generates local ssl certs for testing w/ node http-server:
npm run-script sslgen

# you can also provide a $DOMAIN argument like so:
npm run-script sslgen hiyori
# ...returns key `hiyori_key.pem` & cert `hiyori.pem`

# ...or:
sudo chmod +x scripts/sslgen.sh && ./scripts/sslgen.sh
# osx is a bit more finicky
```

#### *tone generator:*

```
### available from here:
cp etc/tone.py .

### generate some .wav files for testing fft things:
python3 tone.py

### ...you can also specify duration in seconds & frequency in Hz like so:
python3 tone.py 5 440

### ...or just duration:
python3 tone.py 2
```

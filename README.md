# Node TV
p2p over webrtc using data channels and dht

## Roadmap

- Only serve mp4 files
- Split file into pieces
- Serve pieces from visitors
- DHT table like a torrent


## Future
- Option to stream from computer (f.x. a TV stream ... maybe chrome plugin needed?)
- Option to stream from webcam (navigator.getUserMedia)

## Uses
- PeerJS
- Oriento (OrientDB)

## Install
Requires OrientDB
```
git clone git@github.com:gusnips/nodetv.git
npm install
node app
```

- stream a file in `http://localhost:3000/stream`
- watch it in `http://localhost:3000/channel/gusnips`

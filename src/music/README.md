Music compression:

`ffmpeg -i src/music/original.mp3 -b:a 32k -ar 22050 -ac 1 src/music/compressed.mp3`

`ffmpeg -i src/music/original.mp3 -b:a 16k -ar 22050 -ac 1 src/music/compressed16.mp3` (Ended up using this one)

`ffmpeg -i src/music/compressed.mp3 -c:a libopus src/music/compressed.opus`

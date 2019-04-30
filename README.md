## Get all notes:
GET /notes

## Post a note:
POST /notes
body: `{ title: 'some title', content: 'some content'}`
include `Content-Type: application/json` in the headers

## Get a note with id:
GET /notes/:id

## Delete a note:
DELETE /notes/:id

## To start the MongoDB client on Linux:

`$ sudo systemctl start mongodb`

Other usefull commands:
```
$ sudo systemctl status mongodb
$ sudo systemctl stop mongodb
$ sudo systemctl restart mongodb
```
### Deployment Starter

### requiremnets

- Node v20.18.0

1. clone the repository ~ develop branch

### server deployment

- `cd /server`
- install deps `npm i`
- copy `.env.example` into `.env` and populate the file
- do the migrations `npm run migrate:up`
- `npm run dev`

### frontend deployment

- `cd /client`
- install deps `npm i`
- copy `.env.example` into `.env` and populate the file
- `npm run dev`

Please ensure the API_URL is correct in client env

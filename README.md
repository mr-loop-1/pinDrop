### Deployment Starter

### requiremnets

- Node v20.18.0

1. clone the repository ~ develop branch

### server deployment

- `cd /server`
- install deps `npm i`
- copy `.env.example` into `.env` and populate the file
- do the migrations `npx knex migrate:latest`
- `npm run dev`

### frontend deployment

- `cd /client`
- install deps `npm i`
- copy `.env.example` into `.env` and populate the file
- `npm run dev`

### more information

1. Please ensure the API_URL is correct in client env
2. Duplicate files/filenames can't be uploaded even in different folders as on pinata they are stored together
3. Folder names are alphanumeric without spaces
4. Please report any bugs on github
5. currently deleting folder is shallow

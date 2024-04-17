# msadmin-company-sales

To run the microservice, you need to have the .env file created.

To do that:
1. Copy the example.env file and rename it to .env.
2. Then complete the environment variables with your own credentials.

To run this ms:

Install dependencies:
```bash
npm install
```

Start DB:
```bash
docker compose up -d
```

Run the migrations:
```bash
npx prisma db push
```

Update migrations:
```bash
npx prisma migrate dev
```

On dev:
```bash
npm run dev
```
```bash
# watch mode:
npm run dev:watch
```

On production:
```bash
npm clean
```
```bash
npm run build
```
```bash
npm start
```


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## About

### Technologies
- Prisma
- NextJS
- Tailwind
- Graphql
- Auth0

#### How to create a new graphql query/transaction
1. Define it in graphql/types
2. Create query/transaction in graphql/queries
3. yarn codegen will create hooks for apolloClient

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './data/schema';

const app = express();

app.get('/', (req, res) => {
	res.send('GraphQL is great');
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(3001, () => console.log('Listening on port 3001'));

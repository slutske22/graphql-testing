import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
	res.send('GraphQL is great');
});

class Friend {
	constructor(id, input) {
		this.id = id;
		this.firstName = input.firstName;
		this.lastName = input.lastName;
		this.gender = input.gender;
		this.language = input.language;
		this.email = input.email;
	}
}

const friendDatabase = {};

const root = {
	friend: () => {
		return {
			id: '12343',
			firstName: 'Booboo',
			lastName: 'Ohana',
			gender: 'female',
			language: 'english',
			email: 'booboo@booboo.com',
		};
	},
	createFriend: (input) => {
		let id = require('crypto').randomBytes(10).toString('hex');
		friendDatabase[id] = input;
		return new Friend(id, input);
	},
};

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: true,
	})
);

app.listen(3001, () => console.log('Listening on port 3001'));

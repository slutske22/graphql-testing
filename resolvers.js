class Friend {
	constructor(id, { input }) {
		this.id = id;
		this.firstName = input.firstName;
		this.lastName = input.lastName;
		this.gender = input.gender;
		this.language = input.language;
		this.email = input.email;
		this.age = input.age;
		this.contacts = input.contacts;
	}
}

const friendDatabase = {};

// resolver map:
export const resolvers = {
	Query: {
		getFriend: ({ id }) => {
			return new Friend(id, friendDatabase[id]);
		},
	},
	Mutation: {
		createFriend: (input) => {
			let id = require('crypto').randomBytes(10).toString('hex');
			friendDatabase[id] = input;
			const friend = new Friend(id, input);
			console.log(friend);
			return friend;
		},
	},
};

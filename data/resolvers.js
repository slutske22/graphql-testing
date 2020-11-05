import mongoose from 'mongoose';
import { Friends, Aliens } from './dbConnectors';

// resolver map:
export const resolvers = {
	Query: {
		getFriend: ({ id }) => {
			return new Friend(id, friendDatabase[id]);
		},
	},
	Mutation: {
		createFriend: (root, { input }) => {
			const newFriend = new Friends({
				firstName: input.firstName,
				lastName: input.lastName,
				gender: input.gender,
				age: input.age,
				email: input.email,
				language: input.language,
				contacts: input.contacts,
			});

			newFriend.id = newFriend._id;

			return new Promise((resolve, object) => {
				newFriend.save((e) => {
					if (e) reject(e);
					else resolve(newFriend);
				});
			});
		},

		updateFriend: (root, { input }) => {
			return new Promise((resolve, object) => {
				Friends.findOneAndUpdate(
					{ _id: input.id },
					input,
					{ new: true },
					(e, friend) => {
						if (e) reject(e);
						else resolve(friend);
					}
				);
			});
		},

		deleteFriend: (root, { id }) => {
			return new Promise((resolve, object) => {
				Friends.remove({ _id: id }, (e) => {
					if (e) reject(e);
					else resolve('Successfully deleted friend');
				});
			});
		},
	},
};

import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { split } from '@apollo/client/link/core';

const cache = new InMemoryCache({
	addTypename: true
});

const httpLink = new HttpLink({
	uri: import.meta.env.VITE_GRAPHQL_URL
});

const wsLink =
	typeof window !== 'undefined'
		? new GraphQLWsLink(
				createClient({
					url: import.meta.env.VITE_GRAPHQL_WS_URL
				})
			)
		: null;

const link =
	typeof window !== 'undefined'
		? split(
				({ query }) => {
					const definition = getMainDefinition(query);
					return (
						definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
					);
				},
				wsLink!,
				httpLink
			)
		: httpLink;

const client = new ApolloClient({
	cache,
	link,
	connectToDevTools: true
});

export default client;

/* Core */
import { join } from 'path';
import { createServer } from 'http';
import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import chalk from 'chalk';

/* Instruments */
import {
    createApolloCtx, createWsCtx, wsLogging, getUrlParts
} from './utils';
import { schema } from './graphql/schema';

dotenv.config({ path: join(__dirname, '../.env.development.local') });

(async () => {
    const app = express();
    const httpServer = createServer(app);

    const apolloServer = new ApolloServer({
        schema,
        context: createApolloCtx,
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    const { host, port, protocol } = getUrlParts();

    httpServer.listen({ port, host: '0.0.0.0' }, () => {
        const wsServer = new ws.Server({
            server: httpServer,
            path:   apolloServer.graphqlPath,
            host:   '0.0.0.0',
        });

        useServer(
            {
                schema,
                context: createWsCtx,
                ...wsLogging,
            },
            wsServer,
        );

        console.log(
            chalk.cyanBright(
                `🚀 HTTP server ready at ${chalk.blueBright(
                    `${protocol.http}://${host}:${port}${apolloServer.graphqlPath}`,
                )}`,
            ),
        );
        console.log(
            chalk.cyanBright(
                `📲 Subscription server ready at ${chalk.blueBright(
                    `${protocol.ws}://${host}:${port}${apolloServer.graphqlPath}`,
                )}`,
            ),
        );
    });
})();

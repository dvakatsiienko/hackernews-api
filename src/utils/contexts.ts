/* Core */
import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import type { Context as GraphqlWSContext, ServerOptions } from 'graphql-ws';
import chalk from 'chalk';

/* Instruments */
import { ExpressCtx } from '../types';
import { decodeJWTPayload } from './jwt';

const prisma = new PrismaClient();
const pubsub = new PubSub();

export const createApolloCtx = (expressCtx: ExpressCtx) => {
    const { req } = expressCtx;

    let operationName = expressCtx.req.body?.operationName;

    if (typeof operationName === 'undefined') {
        if (expressCtx.req.body?.query.includes('IntrospectionQuery')) {
            operationName = 'IntrospectionQuery';
        }
    }

    console.log(
        chalk.blueBright(
            'Root CTX, operation name:',
            chalk.redBright(operationName),
        ),
    );

    const currentUser = decodeJWTPayload(
        req.headers.authorization,
        expressCtx.req.body?.operationName,
    );

    return {
        req,
        pubsub,
        prisma,
        currentUser,
    };
};

export const createWsCtx = (ctx: GraphqlWSContext) => {
    const currentUser = decodeJWTPayload(
        ctx.connectionParams?.Authorization as string,
    );

    const subCtx = { pubsub, prisma, currentUser };

    return subCtx;
};

export const wsLogging: ServerOptions = {
    onConnect() {
        console.log(
            chalk.yellow('∞'),
            chalk.white('Subscription server'),
            `${chalk.greenBright('connected')}`,
        );
    },
    onSubscribe(_, msg) {
        console.log(
            chalk.yellow('∞'),
            chalk.white('Subscribed to'),
            `${chalk.redBright(msg.payload.operationName)}`,
        );
    },
    onError: (_, msg, errors) => {
        console.error(chalk.yellow('∞'), chalk.red('Subscription Error'), {
            msg,
            errors,
        });
    },
    onComplete: (_, operation) => {
        console.log(
            chalk.yellow('∞'),
            chalk.white('Subscription'),
            chalk.blueBright(operation.id),
            chalk.greenBright(operation.type),
        );
    },
};

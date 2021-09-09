/* Instruments */
import { Resolver, EV } from '../types';

const linkCreatedSubscribe: Resolver = (_, __, ctx) => {
    return ctx.pubsub.asyncIterator([EV.LINK_CREATED]);
};

type Subscriber<TParent = unknown> = {
    subscribe: Resolver<TParent>;
    resolve: Resolver<TParent>;
};

const linkCreated: Subscriber<Record<any, any>> = {
    subscribe: linkCreatedSubscribe,
    resolve: (parent, _, ctx) => {
        return {
            ...parent,
            postedBy: ctx.prisma.link
                .findUnique({ where: { id: parent.id } })
                .postedBy(),
        };
    },
};

const postVotedSubscribe: Resolver = (_, __, ctx) => {
    return ctx.pubsub.asyncIterator([EV.POST_VOTED]);
};

const postVoted: Subscriber = {
    subscribe: postVotedSubscribe,
    resolve: parent => {
        return parent;
    },
};

export const Subscription = {
    linkCreated,
    postVoted,
};

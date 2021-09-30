/* Instruments */
import type { Resolver } from '../types';
import type * as gql from '../graphql';

export const Query: QueryResolvers = {
    async feed(_, args, ctx) {
        const { filter: contains, skip, take } = args;

        const where = contains
            ? { OR: [{ url: { contains } }, { description: { contains } }] }
            : {};

        const posts = await ctx.prisma.post.findMany({
            where,
            skip: skip ?? 0,
            take: take ?? 20,
        });

        const count = await ctx.prisma.post.count({ where });

        return { posts, count };
    },

    async post(_, args, ctx) {
        if (!ctx.userId) {
            throw new Error('Not authenticated.');
        }

        const post = await ctx.prisma.post.findUnique({
            where: { id: args.id },
        });

        if (post === null) {
            throw new Error('Post was not found.');
        }

        return post;
    },

    async user(_, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
            where: { id: args.id },
        });

        if (user === null) {
            throw new Error('User was not found.');
        }

        return user;
    },

    async authenticate(_, args, ctx) {
        console.log(args);

        return true;
    },
};

/* Types */
interface QueryResolvers {
    feed: Resolver<gql.QueryFeedArgs>;
    post: Resolver<gql.QueryPostArgs>;
    user: Resolver<gql.QueryUserArgs>;
    authenticate: Resolver<gql.QueryAuthenticateArgs>;
}

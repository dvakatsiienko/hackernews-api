/* Core */
import type { Post as PrismaPost } from '@prisma/client';

/* Instruments */
import type { Resolver } from '../types';

export const Post: PostResolvers = {
    async postedBy(post, _, ctx) {
        const postedBy = await ctx.prisma.post
            .findUnique({ where: { id: post.id } })
            .postedBy();

        if (postedBy === null) {
            throw new Error(`User that posted post ${post.id} was not found.`);
        }

        return postedBy;
    },

    async votes(post, _, ctx) {
        const votes = await ctx.prisma.post
            .findUnique({ where: { id: post.id } })
            .votes();

        return votes;
    },

    async isVotedByMe(post, _, ctx) {
        if (!ctx.currentUser) {
            return false;
        }

        const userId = ctx.currentUser.userId;

        const votes = await ctx.prisma.post
            .findUnique({ where: { id: post.id } })
            .votes();

        const isVotedByMe = votes.some(vote => vote.userId === userId);

        return isVotedByMe;
    },
};

/* Types */
interface PostResolvers {
    postedBy: Resolver<unknown, PrismaPost>;
    votes: Resolver<unknown, PrismaPost>;
    isVotedByMe: Resolver<unknown, PrismaPost>;
}

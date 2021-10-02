/* Core */
import type { Vote as PrismaVote } from '@prisma/client';

/* Instruments */
import type { Resolver } from '../types';

export const Vote: VoteProps = {
    async post(vote, _, ctx) {
        const post = await ctx.prisma.post.findUnique({
            where: { id: vote.postId },
        });

        return post;
    },

    async user(vote, _, ctx) {
        const user = await ctx.prisma.user.findUnique({
            where: { id: vote.userId },
        });

        return user;
    },
};

/* Types */
interface VoteProps {
    post: Resolver<unknown, PrismaVote>;
    user: Resolver<unknown, PrismaVote>;
}

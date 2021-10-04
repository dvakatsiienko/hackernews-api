/* Core */
import bcrypt from 'bcryptjs';
import faker from 'faker';

/* Instruments */
import { prisma } from './client';

export const createUsers = async () => {
    const password = await bcrypt.hash('12345', 10);

    const dima = await prisma.user.create({
        data: {
            email: 'test@email.io',
            password,
            name:  'Dima',
            posts: {
                create: {
                    url:         'https://railway.app',
                    description:
                        'Railway.app is a cool fit for an API deployments.',
                    createdAt: faker.date.recent(),
                    votes:     {
                        create: {
                            user: { connect: { email: 'test@email.io' } },
                        },
                    },
                },
            },
        },
    });

    const lauren = await prisma.user.create({
        data: {
            email: 'lauren-german@email.io',
            password,
            name:  'Lauren German',
            posts: {
                create: {
                    url:         'https://en.wikipedia.org/wiki/A_Walk_to_Remember',
                    description:
                        '«A Walk to Remember» — is a trash movie, do not watch it!',
                    createdAt: faker.date.recent(),
                    votes:     {
                        create: {
                            user: {
                                connect: { email: 'lauren-german@email.io' },
                            },
                        },
                    },
                },
            },
        },
    });

    const emmanuelle = await prisma.user.create({
        data: {
            email: 'emmanuelle-seigner@email.io',
            password,
            name:  'Emmanuelle Seigner',
            posts: {
                create: {
                    url:         'https://en.wikipedia.org/wiki/Bitter_Moon',
                    description:
                        '«Bitter Moon» — a movie that I appear in, check me out!',
                    createdAt: faker.date.recent(),
                    votes:     {
                        create: [{ userId: dima.id }, { userId: lauren.id }],
                    },
                },
            },
        },
    });

    const jack = await prisma.user.create({
        data: {
            email: 'jack-robbins@email.io',
            password,
            name:  'Jack Robbins',
            posts: {
                create: {
                    url:         'https://www.prisma.io/nextjs',
                    description: 'Check out Prisma with Next.js',
                    createdAt:   faker.date.recent(),
                    votes:       {
                        create: [
                            { userId: dima.id },
                            { userId: lauren.id },
                            { userId: emmanuelle.id },
                        ],
                    },
                },
            },
        },
    });

    const adam = await prisma.user.create({
        data: {
            email: 'adam-shankman@email.io',
            password,
            name:  'Adam Shankman',
            posts: {
                create: {
                    url:         'https://vercel.com',
                    description:
                        'Vercel features really cool deployment service, chick it out!',
                    createdAt: faker.date.recent(),
                    votes:     {
                        create: [
                            { userId: dima.id },
                            { userId: jack.id },
                            { userId: emmanuelle.id },
                            { userId: lauren.id },
                        ],
                    },
                },
            },
        },
    });

    return {
        dima,
        lauren,
        emmanuelle,
        jack,
        adam,
    };
};

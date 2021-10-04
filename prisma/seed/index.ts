/* Core */
import faker from 'faker';

/* Instruments */
import { prisma } from './client';
import { createUsers } from './createUsers';

async function main() {
    const {
        dima, lauren, emmanuelle, jack, adam,
    } = await createUsers();

    await prisma.post.create({
        data: {
            postedById:  dima.id,
            url:         'https://en.wikipedia.org/wiki/Brother_(1997_film)',
            description: 'Where the power lays in, brother?',
            createdAt:   faker.date.recent(),
            votes:       {
                create: [
                    { userId: dima.id },
                    { userId: lauren.id },
                    { userId: emmanuelle.id },
                    { userId: jack.id },
                    { userId: adam.id },
                ],
            },
        },
    });

    const posts = await Promise.all(
        [ ...Array(205).keys() ].map(() => prisma.post.create({
            data: {
                postedById:  dima.id,
                url:         faker.internet.url(),
                description: faker.hacker.phrase(),
                createdAt:   faker.date.recent(),
            },
        })),
    );

    console.log(`🌱  ${posts.length} Posts seeded.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

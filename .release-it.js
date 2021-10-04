module.exports = {
    git: {
        commitMessage: 'v${version}',
    },
    npm: {
        publish: false,
    },
    github: {
        release: true,
        releaseName: 'v${version}',
    },
    hooks: {
        'after:bump': 'npx auto-changelog',
    },
};

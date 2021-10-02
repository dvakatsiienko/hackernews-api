export const getUrlParts = () => {
    /* eslint-disable-next-line prefer-destructuring */
    const port = Number(process.env.PORT);
    const isProd = process.env.NODE_ENV === 'production';
    const protocol = {
        http: isProd ? 'https' : 'http',
        ws:   isProd ? 'wss' : 'ws',
    };
    const host = isProd
        ? 'hackernews-api-production.up.railway.app'
        : 'localhost';

    return { port, protocol, host };
};

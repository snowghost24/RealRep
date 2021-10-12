import 'dotenv/config';

export default {
    scheme: 'https',
    extra: {
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    },
};

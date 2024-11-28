import dotenv from 'dotenv'

dotenv.config();

const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;

if (!EXCHANGE_RATE_API_KEY) {
    throw new Error("EXCHANGE_RATE_API_KEY não informado");
}

const env = {
    EXCHANGE_RATE_API_KEY,
};

export default env;
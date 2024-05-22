import dotenv from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
    MONGO_URI: str(),
    MONGO_COLLECTION_NAME: str(), // Ensure this is validated if used
    PORT: port({ default: 5001 }),
});

export default env;


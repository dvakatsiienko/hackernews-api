/* Core */
import { join } from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';

/* Instruments */
import type { JWTPayload } from '../types';

dotenv.config({ path: join(__dirname, '../../.env.development.local') });

/* eslint-disable-next-line prefer-destructuring */
const JWT_SECRET = process.env.JWT_SECRET;

export const decodeJWTPayload = (
    authHeader: string,
    operationName?: string,
): JWTPayload | null => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET env variable not found!');
    }

    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
        const operation = operationName?.toLowerCase();

        if (operation !== 'login' && operation !== 'signup') {
            console.log(
                chalk.red('No token in authorization header found.', token),
            );
        }

        return null;
    }

    try {
        const jwtPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;

        return jwtPayload;
    } catch (error) {
        // @ts-ignore
        console.log(chalk.red('JWT verification error:'), error.message);
    }

    return null;
};

export const encodeJWTPayload = (jwtPayload: JWTPayload): string => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET env variable not found!');
    }

    const token = jwt.sign(jwtPayload, JWT_SECRET);

    return token;
};

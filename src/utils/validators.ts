/* Core */
import * as yup from 'yup';

/* Instruments */
import type * as gql from '../graphql';

export const createSchema = (mode: Mode) => {
    const loginShape = {
        email: yup
            .string()
            .email('Email should be a valid email.')
            .required('Email is required.'),
        password: yup
            .string()
            .min(4, 'Password is ${min} characters minimum.')
            .required('Password is required.'),
    };

    const signupShape = {
        ...loginShape,
        name: yup
            .string()
            .min(4, 'Name is ${min} characters minimum.')
            .required('Required.'),
    };

    if (mode === 'login') {
        const login: yup.SchemaOf<gql.MutationLoginArgs> = yup
            .object(loginShape)
            .required();

        return login;
    }

    const signup: yup.SchemaOf<gql.MutationLoginArgs> = yup
        .object(signupShape)
        .required();

    return signup;
};

export const validateAuthPayload = async (
    mode: Mode,
    input: gql.MutationSignupArgs | gql.MutationLoginArgs,
) => {
    const schema = createSchema(mode);

    try {
        await schema.validate(input);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

/* Types */
type Mode = 'login' | 'signup';

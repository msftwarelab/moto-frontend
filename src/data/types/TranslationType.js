import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
} from 'graphql';

const TranslationType = new ObjectType({
    name: 'Translation',
    fields: {
        id: {
            type: StringType
        },
        value: {
            type: StringType
        }
    }
});

export default TranslationType;
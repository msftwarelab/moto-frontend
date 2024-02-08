import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLInt,
} from 'graphql';

const PersonType = new ObjectType({
    name: 'Person',
    fields: {
        id: { type: new NonNull(GraphQLInt) },
        name: { type: new NonNull(StringType) },
        email: { type: new NonNull(StringType) },
        phone: { type: new NonNull(StringType) },
        address: { type: new NonNull(StringType) },
        share: { type: new NonNull(GraphQLInt) },
    },
});

export default PersonType;

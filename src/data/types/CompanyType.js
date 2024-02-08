import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLList as List,
    GraphQLBoolean,
    GraphQLEnumType
} from 'graphql';

import PersonType from './PersonType';

export const CreateCompanyFields = {
    name: { type: new NonNull(StringType) },
    email: { type: new NonNull(StringType) },
    phone: { type: new NonNull(StringType) },
    line: { type: new NonNull(StringType) },
    address: { type: new NonNull(StringType) },
    isCompany: { type: new NonNull(GraphQLBoolean) },
}

export const CompanyFields = {
    ...CreateCompanyFields,
    userId: { type: new NonNull(StringType) },
    persons: { type: new List(PersonType) },
    status: { type: new NonNull(StringType) },
}

const CompanyType = new ObjectType({
    name: 'Company',
    fields: {
        id: { type: new NonNull(IntType) },
        ...CompanyFields
    },
});

export default CompanyType;

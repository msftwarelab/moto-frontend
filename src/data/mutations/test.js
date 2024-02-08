// GrpahQL
import { GraphQLString } from 'graphql';

// Sequelize models
import { ThreadItems, Threads } from '../../data/models';
import CompanyType from '../types/CompanyType';
import { Company, Person } from "../models/Person";

const test = {
    // args: {
    //     threadId: { type: new NonNull(IntType) }
    // },
    args: {},
    type: CompanyType,

    async resolve({ request, response }, { }) {
        const company = await Company.create({
            name: "Hello world",
            phone: "123456789",
            line: "Hello",
            address: 'New York',
            email: "hello@world",
            isCompany: true,
        })
        await Person.create({
            name: "Jack",
            phone: "123456789",
            line: "Hello",
            email: "hello@world",
            address: 'New York',
            companyId: company.id,
            share: 0
        })
        await Person.create({
            name: "Pizdjeck",
            phone: "123456789",
            line: "Hello",
            email: "hello@world",
            address: 'New York',
            companyId: company.id,
            share: 0
        })
        

        
        return await Company.findById(company.id, { include: [ { model: Person, as: 'persons' } ] });
    },
};

export default test;

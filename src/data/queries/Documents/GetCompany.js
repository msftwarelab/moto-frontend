// GrpahQL
import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import CompanyType from '../../types/CompanyType';
import { Op } from 'sequelize';

import { Company, Person } from "../../models/Person";

const GetCompany = {
    args: { id: { type: GraphQLInt }, userId: { type: GraphQLString } },
    type: CompanyType,

    async resolve({ request, response }, { id, userId }) {
        if (request.user && !userId && !id) {
            userId = request.user.id;
        }
        return await Company.findOne({
            where: {
                ["$or"]: [
                    { id },
                    { userId }
                ]
            }
        }, { include: [{ model: Person, as: 'persons' }] });
    },
};

export default GetCompany;

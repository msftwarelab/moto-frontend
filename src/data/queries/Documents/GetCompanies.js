// GrpahQL
import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import CompanyType from '../../types/CompanyType';
import { Company, Person } from "../../models/Person";
const GetCompanies = {

    args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        ids: { type: new GraphQLList(GraphQLInt) },
        id: { type: GraphQLInt },
    },
    type: new GraphQLList(CompanyType),

    async resolve({ request, response }, { limit, offset, ids, id }) {
        if (ids === undefined && id !== undefined) {
            ids = [id];
        }
        
        limit = limit || 10;
        if(limit > 100) {
            limit = 100;
        }

        const r = await Company.findAll({
            include: [{ model: Person, as: 'persons' }],
            limit: limit || 10,
            offset: offset || 0,
            ...(ids !== undefined ? {
                where: {
                    id: {
                        $in: ids
                    }
                }
            }: {})
        });
        return r;
    },
};

export default GetCompanies;

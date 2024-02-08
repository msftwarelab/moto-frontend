import { GraphQLString, GraphQLList } from 'graphql';
import Translation from '../models/Translation';

import TranslationType from '../types/TranslationType';

const getTranslation = {

    type: TranslationType,
    args: {
        id: { type: GraphQLString }
    },

    async resolve({ request }, { id }) {
        return await Translation.findOne({ where: { id } });
    }
};

export const getTranslations = {
    type: new GraphQLList(TranslationType),
    args: {
        ids: { type: new GraphQLList(GraphQLString) }
    },
    async resolve({ request }, { ids }) {
        return await Translation.findAll({ where: { id: ids } });
    }
};

export default getTranslation;
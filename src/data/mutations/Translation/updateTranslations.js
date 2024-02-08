import Translation from "../../models/Translation";
import { GraphQLList, GraphQLInputObjectType, GraphQLString, GraphQLObjectType } from 'graphql';

const TranslationInputType = new GraphQLInputObjectType({
    name: 'TranslationInput',
    fields: {
        id: {
            type: GraphQLString
        },
        value: {
            type: GraphQLString
        }
    }
});

const updateTranslations = {
    type: new GraphQLObjectType({
        name: "UpdateTranslationResponse",
        fields: {
            status: {
                type: GraphQLString
            },
        }
    }),
    args: {
        translations: {
            type: new GraphQLList(TranslationInputType)
        }
    },

    resolve: async ({ request }, { translations }) => {
        
        if (request.user && request.user.admin) {
            for (const translation of translations) {
                try {
                    const [instance, created] = await Translation.findOrCreate({
                        where: { id: translation.id },
                        defaults: { value: translation.value }
                    });

                    if (!created) {
                        await instance.update({ value: translation.value });
                    }
                    
                } catch (error) {
                    return { status: error }
                }
            }
            return { status: 'success' }
        } else {
            return {
              status: 'notLoggedIn',
            };
        }
    }

    
}

export default updateTranslations
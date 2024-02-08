

// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType,
} from 'graphql';

import DocumentVerificationType from '../../types/DocumentVerification';

import { DocumentVerification } from '../../../data/models';

const ShowDocumentList = {

  //type: DocumentVerificationType,
  type: new List(DocumentVerificationType),

  args: {
    mark: { type: StringType },
  },


  async resolve({ request, response }, { mark }) {
    if (request.user) {
      let userId = request.user.id;
      const where = {
        userId
      };

      if (mark) {
        where.document_mark = mark
      }

      return await DocumentVerification.findAll({
        where
      });
    }
  },
};

export default ShowDocumentList;


/*
query ShowDocumentList{
    ShowDocumentList{
        id
        userId,
        fileName,
        fileType
    }
}
*/
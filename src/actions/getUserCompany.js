import { gql } from "react-apollo";
import { GET_USER_COMPANY } from "../constants";

const query = gql`
query GetCompany($id: Int, $userId: String) {
    GetCompany(id: $id, userId: $userId) {
        id,
        name,
        email,
        phone,
        address,
    }
}

`;



export function getUserCompany(userId) {
    return async (dispatch, getState, { client }) => {

        const data = await client.query({
            query,
            variables: {
                userId
            }
        });

        console.log(`getUserCompany\n\n\n\n\n\n\n\n`,data, {query, variables: {userId}}, `\n\n\n\n\n\n\n\n\n\n\n\n`);

        dispatch({
            type: GET_USER_COMPANY,
            payload: data.data.GetCompany
        })

        return true;
    }
}
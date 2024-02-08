import CompanyType, { CreateCompanyFields } from "../../types/CompanyType";
import { Company } from "../../models/Person";

const CreateCompany = {
    type: CompanyType,
    args: CreateCompanyFields,


    async resolve({ request, response }, fields) {
        if (request.user) {
            let where = { userId: request.user.id };

            const exists = await Company.findOne({
                where
            });
            if (exists) {
                return null;
            }

            const newCompany = await Company.create({
                userId: request.user.id,
                ...fields
            });

            return newCompany;
        } else {
            return null;
        }
    }
}

export default CreateCompany;
import DataType from 'sequelize';
import Model from '../sequelize';

const DocumentVerification = Model.define('DocumentVerification', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type : DataType.UUID,
        defaultValue : DataType.UUIDV1,
        allowNull: false
    },

    fileName: {
        type: DataType.STRING,
    },


    fileType: {
        type: DataType.STRING,
    },

    documentStatus: {
        type: DataType.ENUM('pending', 'approved'),
        defaultValue: 'pending',
    },

    document_mark: {
        type: DataType.ENUM('default', 'company_registration', 'green_card', 'passport'),
        defaultValue: 'default',
    }

   
});

export default DocumentVerification;
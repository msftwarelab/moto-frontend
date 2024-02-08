import DataType from 'sequelize';
import Model from '../sequelize';
const Translation = Model.define('Translation', {
    id: {
        type: DataType.STRING,
        primaryKey: true,
    },
    value: {
        type: DataType.STRING,
    }
}, {
    indexes: [
        { fields: ['id'] },
    ],
});
export default Translation;

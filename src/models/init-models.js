import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _roles from  "./roles.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const roles = _roles.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});

  return {
    roles,
    users,
  };
}

import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

//get all
export const getAllUsers = async (req, res) => {
    try {
        const { username, fullName, minLogin, maxLogin } = req.query;
        let where = {};

        if (username) where.username = { [Op.like]: `%${username}%` };
        if (fullName) where.full_name = { [Op.like]: `%${fullName}%` };
        if (minLogin) where.login_count = { [Op.gte]: minLogin };
        if (maxLogin) where.login_count = { [Op.lte]: maxLogin };

        const users = await model.users.findAll({ 
            where, 
            include: [{ model: model.roles, as: "role" }] 
        });


        return responseData(res, 200, "Lấy danh sách người dùng thành công", users);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi lấy danh sách người dùng", { message: error.message });
    }
};


// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await model.users.findByPk(id, {
            include: [
                {
                    model: model.roles,
                    as: 'role',
                    attributes: ['id', 'name', 'description']
                }
            ]
        });

        if (!user) {
            return responseData(res, 404, "Không tìm thấy người dùng", null);
        }

        return responseData(res, 200, "Lấy thông tin người dùng thành công", user);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi lấy người dùng", error);
    }
};


// Create user
export const createUser = async (req, res) => {
    try {
        const user = await model.users.create(req.body);
        return responseData(res, 201, "Tạo người dùng thành công", user);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi tạo người dùng", error);
    }
};

// Soft delete user
export const softDeleteUser = async (req, res) => {
    try {
        const user = await model.users.findByPk(req.params.id);
        if (!user) return responseData(res, 404, "Người dùng không tồn tại", null);
        
        await user.update({ status: false });
        return responseData(res, 200, "Xóa mềm người dùng thành công", user);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi xóa mềm người dùng", error);
    }
};

// Authenticate user and update status
export const authenticateUser = async (req, res) => {
    try {
        const { email, username } = req.body;
        const user = await model.users.findOne({ where: { email, username } });
        
        if (!user) return responseData(res, 400, "Thông tin không chính xác", null);
        
        await user.update({ status: true });
        return responseData(res, 200, "Người dùng đã được kích hoạt", user);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi xác thực người dùng", error);
    }
};
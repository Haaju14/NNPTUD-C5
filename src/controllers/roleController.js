import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// Get all roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await model.roles.findAll();
        return responseData(res, 200, "Lấy danh sách vai trò thành công", roles);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách vai trò:", error); // Log lỗi ra console
        return responseData(res, 500, "Lỗi khi lấy danh sách vai trò", { message: error.message });
    }
};


// Get role by ID
export const getRoleById = async (req, res) => {
    try {
        const role = await model.roles.findByPk(req.params.id);
        if (!role) return responseData(res, 404, "Không tìm thấy vai trò", null);
        return responseData(res, 200, "Lấy thông tin vai trò thành công", role);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi lấy vai trò", error);
    }
};

// Create role
export const createRole = async (req, res) => {
    try {
        const role = await model.roles.create(req.body);
        return responseData(res, 201, "Tạo vai trò thành công", role);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi tạo vai trò", error);
    }
};

// Soft delete role
export const softDeleteRole = async (req, res) => {
    try {
        const role = await model.roles.findByPk(req.params.id);
        if (!role) return responseData(res, 404, "Vai trò không tồn tại", null);
        
        await role.update({ name: `${role.name}_deleted` });
        return responseData(res, 200, "Xóa mềm vai trò thành công", role);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi xóa mềm vai trò", error);
    }
};
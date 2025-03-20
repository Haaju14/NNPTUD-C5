import initModels from "../models/init-models.js";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";

const model = initModels(sequelize);

// Lấy danh sách category
export const getAllCategories = async (req, res) => {
  try {
    const categories = await model.category.findAll();
    return responseData(res, 200, "Lấy danh sách danh mục thành công", categories);
  } catch (error) {
    return responseData(res, 500, "Lỗi khi lấy danh sách danh mục", error);
  }
};

// Tạo category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return responseData(res, 400, "Tên danh mục không được để trống", null);
    
    const newCategory = await model.category.create({ name, description });
    return responseData(res, 201, "Tạo danh mục thành công", newCategory);
  } catch (error) {
    return responseData(res, 500, "Lỗi khi tạo danh mục", error);
  }
};

// Cập nhật category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const category = await model.category.findByPk(id);
    if (!category) return responseData(res, 404, "Không tìm thấy danh mục", null);
    
    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();
    
    return responseData(res, 200, "Cập nhật danh mục thành công", category);
  } catch (error) {
    return responseData(res, 500, "Lỗi khi cập nhật danh mục", error);
  }
};

// Xóa mềm category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await model.category.findByPk(id);
    if (!category) return responseData(res, 404, "Không tìm thấy danh mục", null);
    
    await category.destroy();
    return responseData(res, 200, "Xóa danh mục thành công", null);
  } catch (error) {
    return responseData(res, 500, "Lỗi khi xóa danh mục", error);
  }
};


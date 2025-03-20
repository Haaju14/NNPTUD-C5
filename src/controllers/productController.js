import initModels from "../models/init-models.js";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";

const model = initModels(sequelize);


// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, quantity, imageUrl, category_id, description } = req.body;
      
      const product = await model.product.findByPk(id);
      if (!product) return responseData(res, 404, "Không tìm thấy sản phẩm", null);
      
      product.name = name || product.name;
      product.price = price || product.price;
      product.quantity = quantity || product.quantity;
      product.imageUrl = imageUrl || product.imageUrl;
      product.category_id = category_id || product.category_id;
      product.description = description || product.description;
      await product.save();
      
      return responseData(res, 200, "Cập nhật sản phẩm thành công", product);
    } catch (error) {
      return responseData(res, 500, "Lỗi khi cập nhật sản phẩm", error);
    }
  };
  
  // Xóa mềm sản phẩm
  export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await model.product.findByPk(id);
      if (!product) return responseData(res, 404, "Không tìm thấy sản phẩm", null);
      
      await product.destroy();
      return responseData(res, 200, "Xóa sản phẩm thành công", null);
    } catch (error) {
      return responseData(res, 500, "Lỗi khi xóa sản phẩm", error);
    }
  };
import db from "../models/index.js";

export class CategoryController {
    async createCategory(req, res) {
        try {
            const category = await db.Category.create(req.body);
            return res.status(201).json({ statusCode: 201, message: 'success', data: category });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllCategories(_, res) {
        try {
            const categories = await db.Category.findAll({ include: { all: true } });
            return res.status(200).json({ statusCode: 200, message: 'success', data: categories });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getCategoryById(req, res) {
        try {
            const category = await db.Category.findByPk(req.params.id);
            if (!category) return res.status(404).json({ statusCode: 404, message: 'Not found' });
            return res.status(200).json({ statusCode: 200, message: 'success', data: category });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateCategory(req, res) {
        try {
            const [updated] = await db.Category.update(req.body, { where: { id: req.params.id } });
            if (!updated) return res.status(404).json({ statusCode: 404, message: 'Not found' });
            const updatedCategory = await db.Category.findByPk(req.params.id);
            return res.status(200).json({ statusCode: 200, message: 'success', data: updatedCategory });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            const deleted = await db.Category.destroy({ where: { id: req.params.id } });
            if (!deleted) return res.status(404).json({ statusCode: 404, message: 'Not found' });
            return res.status(200).json({ statusCode: 200, message: 'deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

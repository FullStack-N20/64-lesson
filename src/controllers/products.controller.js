import db from '../models/index.js'

export class ProductController {
    async createProduct(req, res) {
        try {
            const product = await db.Product.create(req.body);
            return res.status(201).json({ statusCode: 201, message: 'success', data: product });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getAllProduct(_, res) {
        try {
            const products = await db.Product.findAll({ include: { all: true } });
            return res.status(200).json({ statusCode: 200, message: 'success', data: products });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await db.Product.findByPk(req.params.id);
            if (!product) return res.status(404).json({ statusCode: 404, message: 'Not found' });
            return res.status(200).json({ statusCode: 200, message: 'success', data: product });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const [updated] = await db.Product.update(req.body, { where: { id: req.params.id } });
            if (!updated) return res.status(404).json({ statusCode: 404, message: 'Not found' });
            const updatedProduct = await db.Product.findByPk(req.params.id);
            return res.status(200).json({ statusCode: 200, message: 'success', data: updatedProduct });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const deleted = await db.Product.destroy({ where: { id: req.params.id } });
            if (!deleted) return res.status(404).json({ statusCode: 404, message: 'Not found' });
            return res.status(200).json({ statusCode: 200, message: 'deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

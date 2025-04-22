import db from "../../models/index.js";
const { Category, Blog } = db;

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all categories (with their blogs)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: { model: Blog, as: 'blogs' },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: { model: Blog, as: 'blogs' },
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name || category.name;
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

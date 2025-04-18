import db from "../../models/index.js";
const { Blog, User, Category } = db;

export const createBlog = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findByPk(req.body.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the blog
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId, // this links the blog to the user
    });

    // Find categories by name (or create them)
    const categories = await Category.findAll({
      where: {
        name: req.body.categories, // array of category names
      },
    });

    // Associate categories with the blog
    await blog.setCategories(categories);

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

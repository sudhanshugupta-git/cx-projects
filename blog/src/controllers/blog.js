import db from "../../models/index.js";
const { Blog, User, Category } = db;

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    // const { title, content, userId, categoryId} = req.body;
    
    // Validate input
    // if (!title || !content || !userId || !categoryId) {
    //   return res.status(400).json({ error: 'All fields are required' });
    // }

    // Create blog entry (do not include categoryIds here)
    // const blog = await Blog.create({ title, content, userId, categoryId});

    
    const { title, content, userId, categoryIds = []} = req.body;

    // Create blog entry (do not include categoryIds here)
    const blog = await Blog.create({ title, content, userId});

    // Associate blog with categories (many-to-many)
    if (Array.isArray(categoryIds) && categoryIds.length > 0) {
      await blog.setCategories(categoryIds);  // setCategories() method comes from the belongsToMany association. Sequelize automatically injects methods into the model instances for managing the relationship. This is called mixins.
    }

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all blogs with associated user and categories
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, categoryIds = [] } = req.body;

    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    blog.title = title ?? blog.title;
    blog.content = content ?? blog.content;
    await blog.save();

    // Update categories if provided
    if (categoryIds.length > 0) {
      await blog.setCategories(categoryIds);
    }

    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    await blog.destroy();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

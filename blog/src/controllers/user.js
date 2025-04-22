import db from "../../models/index.js";
const { User, Blog } = db;

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users (with their blogs)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: { model: Blog, as: 'blogs' },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: { model: Blog, as: 'blogs' },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

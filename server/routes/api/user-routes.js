module.exports = {
  async getSingleUser({ user = null, params }, res) {
    try {
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });

      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(foundUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createUser({ body }, res) {
    try {
      const user = await User.create(body);
      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Failed to create user' });
    }
  },

  async login({ body }, res) {
    try {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async saveBook({ user, body }, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Failed to save book' });
    }
  },

  async deleteBook({ user, params }, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Failed to delete book' });
    }
  },
};

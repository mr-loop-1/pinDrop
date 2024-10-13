exports.getUser = (req, res) => {
  return res.status(200).json({ user: trimUser(req.user) });
};

exports.updateUser = (req, res) => {};

const trimUser = (user) => ({
  ulid: user.ulid,
  username: user.username,
  email: user.email,
});

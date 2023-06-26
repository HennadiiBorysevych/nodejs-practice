const path = require("path");
const fs = require('fs/promises')
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
     const {_id}=req.user
  const { path, temporUpload, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname)
  await fs.readFile(temporUpload,resultUpload)
  const avatarURL = path.join('avatars', originalname)
  await User.findByIdAndUpdate(_id, {avatarURL})
};

module.exports = updateAvatar;

const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: temporUpload, originalname } = req.file;

  const userAvatarName = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, userAvatarName);

  Jimp.read(temporUpload, (err, avatar) => {
    if (err) throw err;
    avatar
      .resize(250, 250)
      .quality(60)
      .write(temporUpload, () => {
        fs.rename(temporUpload, resultUpload);

        const avatarURL = path.join("avatars", userAvatarName);

        User.findByIdAndUpdate(_id, { avatarURL }).then(() => {
          res.status(200).json({
            message: avatarURL,
          });
        });
      });
  });
};

module.exports = updateAvatar;

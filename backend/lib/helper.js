const  userSocketIDs  = require("../server.js");

const getOtherMember = (members, userId) =>
  members.find((member) => member._id.toString() !== userId.toString());

  const getSockets = (users = []) => {
    const sockets = users.map((user) => userSocketIDs[user.toString()]);
    return sockets;
  };
  

const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
 
module.exports = {
  getOtherMember,
  getSockets,
  getBase64 
};

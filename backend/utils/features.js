const uuid = require("uuid").v4;
const cloudinary = require("cloudinary").v2;
const { getBase64, getSockets } = require("../lib/helper.js");




const emitEvent = (req, event, users, data) => {
    const io = req.app.get("io");
    const usersSocket = getSockets(users);
    io.to(usersSocket).emit(event, data);
  };
  
  const uploadFilesToCloudinary = async (files = []) => {
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          getBase64(file),
          {
            resource_type: "auto",
            public_id: uuid(),
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
      });
    });
  
    try {
      const results = await Promise.all(uploadPromises);
  
      const formattedResults = results.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));
      return formattedResults;
    } catch (err) {
      throw new Error("Error uploading files to cloudinary", err);
    }
  };
  
  const deletFilesFromCloudinary = async (public_ids) => {
    // Delete files from cloudinary
  };

  module.exports={emitEvent,uploadFilesToCloudinary,deletFilesFromCloudinary}
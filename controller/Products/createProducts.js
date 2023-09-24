const Products = require("../../modal/products.modal.js");
const formidable = require("formidable");
const uploadFiles = require("../../middleware/upload");
const createProducts = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
    }
    try {
      const { name, description, price } = fields;


      const filesArray = Object.values(files);
      let allFileUploadedArray = [];
      allFileUploadedArray = await Promise.all(
        filesArray?.map(async (item) => {
          // console.log(item, "item");
          let location = item.filepath;
          const originalFileName = item.originalFilename;
          const fileType = item.mimetype;
          // uploads file.
          const data = await uploadFiles.upload(
            location,
            originalFileName,
            `products/`
          );
          return {
            url: data.Location,
            type: fileType,
          };
        })
      );
      const products = new Products({
        name,
        description,
        price,
        media: allFileUploadedArray,
      });

      await products.save();
      res.json({
        status: 200,
        message: "success",
      });
    } catch (error) {
      return next(error);
    }
  });
};

module.exports = createProducts;

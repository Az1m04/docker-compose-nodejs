const Products = require("../../modal/products.modal");

const getProducts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const viewSize = parseInt(req.query.viewSize) || 10;
    const products = await Products.aggregate([
      {
        $facet: {
          count: [
            {
              $count: "total",
            },
          ],

          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $skip: (startIndex-1)*viewSize,
            },
            {
              $limit: viewSize,
            },
          ],
        },
      },
    ]);
    res.json({
      status: 200,
      message: "success",
      products:{
        products:products[0]?.data,
       total: products[0]?.count[0]?.total
      },
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = getProducts;

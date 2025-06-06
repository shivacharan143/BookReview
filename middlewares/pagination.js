const pagination = (defaultLimit = 10, maxLimit = 50) => {
    return (req, res, next) => {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(
        parseInt(req.query.limit) || defaultLimit,
        maxLimit
      );
      const skip = (page - 1) * limit;
  
      req.pagination = {
        page,
        limit,
        skip,
      };
  
      next();
    };
  };
  
  module.exports = pagination;
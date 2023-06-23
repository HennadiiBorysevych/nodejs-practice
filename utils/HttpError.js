const errorStatuses = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const HTTPError = (status, message = errorStatuses[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HTTPError;

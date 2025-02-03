SimpleResponse.fromError = function (error) {
  return new SimpleResponse(undefined, undefined, { message: error.message });
};

SimpleResponse.from2xxResponse = function (response) {
  return new SimpleResponse(response.status, response.data);
};

SimpleResponse.fromFailedResponse = function (response, message) {
  return new SimpleResponse(response.status, undefined, { message });
};

function SimpleResponse(status, data, details) {
  return Object.freeze({
    status,
    data,
    details,
  });
}

export default SimpleResponse;

const HttpResponseMock = {
  ok: jest.fn(() => {
    return { statusCode: 200 };
  }),
  internalError: jest.fn(() => {
    return { statusCode: 500 };
  }),
  invalidFormat: jest.fn(() => {
    return { statusCode: 403 };
  }),
};

module.exports = { HttpResponseMock };

const { logger } = require('../logger');

class HttpResponse {
  constructor(response) {
    this.response = response;
  }

  ok(payload) {
    return this.response.status(200).json(payload);
  }

  internalError(message, error) {
    logger.error(error);
    return this.response.status(500).json({ message });
  }

  notFound(payload) {
    return this.response.status(404).json(payload);
  }

  invalidFormat(errors) {
    return this.response.status(403).json({ validationErrors: errors });
  }
}

module.exports = { HttpResponse };

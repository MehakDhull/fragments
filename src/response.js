/**
 * Creates a success response.
 * Usage: createSuccessResponse({ key: 'value' })
 *
 * Example:
 * {
 *   "status": "ok",
 *   "key": "value"
 * }
 */
function createSuccessResponse(data = {}) {
  return {
    status: 'ok',
    ...data,
  };
}

/**
 * Creates an error response.
 * Usage: createErrorResponse(404, 'Not Found')
 *
 * Example:
 * {
 *   "status": "error",
 *   "error": {
 *     "code": 404,
 *     "message": "Not Found"
 *   }
 * }
 */
function createErrorResponse(code, message) {
  return {
    status: 'error',
    error: {
      code,
      message,
    },
  };
}

module.exports = {
  createSuccessResponse,
  createErrorResponse,
};

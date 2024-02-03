//response.js
export const response = ({ isSuccess, code, message }, result) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    result: result,
  }
}

export const loginResponse = ({ isSuccess, code, message }, result) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    user: result,
  }
}

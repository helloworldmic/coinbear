export function loginSuccess() {
  return {
    type: "@@Auth/LOGIN_SUCCESS" as const,
  };
}

export function loginFail() {
  return {
    type: "@@Auth/LOGIN_FAIL" as const,
  }
}
export function logoutSuccess() {
  return {
    type: "@@Auth/LOGOUT_SUCCESS" as const,
  };
}

export function loadToken(token: string) {
  return {
    type: '@Auth/load_token' as const,
    token,
  }
}

export type IAuthAction =
  // | CallHistoryMethodAction
  ReturnType<typeof loginSuccess> |
  ReturnType<typeof logoutSuccess> |
  ReturnType<typeof loginFail> |
  ReturnType<typeof loadToken>


export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/
export const UPPER_CASE_LETTER_REGEX = /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()]{1,}$/
export const LOWER_CASE_LETTER_REGEX = /^(?=.*[a-z])[a-zA-Z0-9!@#$%^&*()]{1,}$/
export const SPECIAL_CHARACTER_REGEX = /^(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{1,}$/
export const NUMBER_REGEX = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()]{1,}$/
export const LENGTH_REGEX = /^[a-zA-Z0-9!@#$%^&*()]{8,}$/
export const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export const APIs = {
  mock: { emailExistAPI: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/checkEmail" },
  actual: {
    emailExistAPI: "http://51.20.216.159/api/user/checkExistedEmail",
    checkBirthdateAPI: "http://51.20.216.159/api/user/checkBirthDate",
    signupAPI: "http://51.20.216.159/api/user/signup",
    resendConfirmationEmail: "http://51.20.216.159/api/user/resendConfirmEmail",
    confirmEmail: "http://51.20.216.159/api/user/confirmEmail",
    assignPassword: "http://51.20.216.159/api/user/AssignPassword",
    checkUsername: "http://51.20.216.159/api/user/checkAvailableUsername",
    assignUsername: "http://51.20.216.159/api/user/AssignUsername",
    changeProfilePicture: "http://51.20.216.159/api/user/profile/image",
  },
}

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/
export const UPPER_CASE_LETTER_REGEX = /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()]{1,}$/
export const LOWER_CASE_LETTER_REGEX = /^(?=.*[a-z])[a-zA-Z0-9!@#$%^&*()]{1,}$/
export const SPECIAL_CHARACTER_REGEX = /^(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{1,}$/
export const NUMBER_REGEX = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()]{1,}$/
export const LENGTH_REGEX = /^[a-zA-Z0-9!@#$%^&*()]{8,}$/
export const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export const APIs = {
  mock: {
    emailExistAPI: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/checkEmail",
    checkBirthdateAPI: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/checkBirthDate",
    signupAPI: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/signup",
    resendConfirmationEmail: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/resendConfirmEmail",
    confirmEmail: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/confirmEmail",
    assignPassword: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/AssignPassword",
    checkUsername: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/checkAvailableUsername",
    assignUsername: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/AssignUsername",
    changeProfilePicture: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/api/user/profile/image",
  },
  actual: {
    emailExistAPI: "http://backend.gigachat.cloudns.org/api/user/existedEmailORusername",
    checkBirthdateAPI: "http://backend.gigachat.cloudns.org/api/user/checkBirthDate",
    signupAPI: "http://backend.gigachat.cloudns.org/api/user/signup",
    resendConfirmationEmail: "http://backend.gigachat.cloudns.org/api/user/resendConfirmEmail",
    confirmEmail: "http://backend.gigachat.cloudns.org/api/user/confirmEmail",
    assignPassword: "http://backend.gigachat.cloudns.org/api/user/AssignPassword",
    checkUsername: "http://backend.gigachat.cloudns.org/api/user/checkAvailableUsername",
    assignUsername: "http://backend.gigachat.cloudns.org/api/user/AssignUsername",
    changeProfilePicture: "http://backend.gigachat.cloudns.org/api/user/profile/image",
    getProfile: "http://backend.gigachat.cloudns.org/api/user/profile/",
    uploadMedia: "http://backend.gigachat.cloudns.org/api/media",
    googleAuth: "http://backend.gigachat.cloudns.org/api/user/googleAuth",
    forgotPassword: "http://backend.gigachat.cloudns.org/api/user/forgotpassword",
    resetPassword: "http://backend.gigachat.cloudns.org/api/user/resetpassword",
    getNotifications: "http://backend.gigachat.cloudns.org/api/notification/all",
    loginAPI: "http://backend.gigachat.cloudns.org/api/user/login",
    searchUsers: "http://backend.gigachat.cloudns.org/api/user/search",
    searchTweets: "http://backend.gigachat.cloudns.org/api/tweets/search",
    searchTrends: "http://backend.gigachat.cloudns.org/api/trends/search",
    getTrends: "http://backend.gigachat.cloudns.org/api/trends/",
    getAllNotifications: "http://backend.gigachat.cloudns.org/api/user/notifications",
    getNotificationUnseenCount: "http://backend.gigachat.cloudns.org/api/user/notifications/unseenCount",
    markNotificationSeen: "http://backend.gigachat.cloudns.org/api/user/notifications/markAllAsSeen",
  },
}

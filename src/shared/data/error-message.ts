const COMMON_ERROR_MESSAGE = {
  required: 'This field is required.',
  invalidEmail: 'Please enter the correct email address.',
  errorFirstName: 'Please enter the correct first name.',
  errorLastName: 'Please enter the correct last name.',
  areaCode: 'Please enter the correct area code.',
  phone: 'Please enter the correct phone number.',
  unconfirmRobot: 'Please ensure you are not a robot.',
  robotUnloaded: 'Our reCAPTCHA can’t be displayed, please make sure you can access Google’s service.',
  expireRobot: 'Verification expired. Please check this box again.',
  maxLength: 'Exceeds max length',
  validChoice: ' is not a valid choice',
  uploadImgMaxSize: 'The file cannot be larger than 10M. ',
  server: 'Server error, please contact team@bankorus.com.',
  emailLinkGoogle: 'This email has been linked google mail - try login with google.',
  authExpired: 'Auth code expired - please login again.',
  codeIncorrect: 'Please enter the correct code',
  codeLength: 'Ensure this field has at least 6 characters.',
  fundsPwdIncorrect: 'Password is incorrect',
  pwdLength: 'This password must contain 8 ~20 characters.',
  symbolLength: 'This field must contain 3 ~10 characters.',
  pwdIncorrect: 'Password is incorrect',
  formatError: 'Amount is incorrect.'
};

const REGISTER_ERROR_MESSAGE = {
  emailRegistered: 'The email address has already been registered.',
  emailUnRegistered: 'Email not exists or not verified.',
  shortPassword:  'This password is too short. It must contain at least 8 characters.',
  simplePassword: 'Password must include at least one lowercase letter, one uppercase letter, and one digit.',
  passwordNotMatch: 'Password is not matched.',
  unconfirmTerms: 'Please ensure you have read the terms and agree it.',
  unconfirmPolicy: 'Please ensure you have read the policy and agree it.',
};

const LOGIN_ERROR_MESSAGE = {
  unRegisteredEmail: 'This Email address hasn’t been registered.',
  wrongPassword: 'User account or password is incorrect'
};

const EMAIL_ACTIVATION_ERROR_MESSAGE = {
  wrongLink: 'Link is wrong!',
  serverError: 'Something is wrong, please retry.'
};

const RESET_PASSWORD_ERROR_MESSAGE = {
  unRegisteredEmail: 'This Email address hasn’t been registered.',
};

const WALLET_EDIT_ERROR_MESSAGE = {
  unconfirmAgreement: 'Check this box to confirm that you have read, understand and accept sale agreement.'
};

const FUNDS_WITHDRAW_ERROR = {
  minLimit: 'less than the minimum withdraw limit',
  insufficient: 'more than available cash',
  maxLimit: 'More than 24h maximum withdraw limit',
  numberType: 'please enter valid number',
  password: 'Password should include 8-20 characters',
  changePwd_noWithdraw: 'Sorry，you can\'t withdraw right now. Because you have changed sensitive information in the past 24 hours.',
  tokenAddress: 'pleas enter valid address'
};

const EXCHANGE_ERROR_MESSAGE = {
  insufficient: 'over your cash available',
  cahsNotEnoughForFee: 'Left cash is not enough for trade fee',
  tradeMin: 'less than the minimum limit',
  tradeMax: 'more than the max limit',
  insufficientToken: 'over your available token'
};


export const ERROR_MESSAGE = {
  common: COMMON_ERROR_MESSAGE,
  registerPage: REGISTER_ERROR_MESSAGE,
  loginPage: LOGIN_ERROR_MESSAGE,
  emailActivation: EMAIL_ACTIVATION_ERROR_MESSAGE,
  resetPassword: RESET_PASSWORD_ERROR_MESSAGE,
  walletEdit: WALLET_EDIT_ERROR_MESSAGE,
  withdraw: FUNDS_WITHDRAW_ERROR,
  exchange: EXCHANGE_ERROR_MESSAGE,
};

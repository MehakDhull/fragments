// // import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
// const {
//   CognitoUserPool,
//   CognitoUser,
//   AuthenticationDetails,
//   CognitoUserAttribute,
// } = require('amazon-cognito-identity-js');
// const poolData = {
//     UserPoolId: "us-east-1_EEHFcSnH1", // Replace with your User Pool ID
//     ClientId: "7isffc9d0krf4ebvf4bu2uslvs", // Replace with your App Client ID
// };

// const userPool = new CognitoUserPool(poolData);

// export const signUp = (email, password) => {
//     const attributeList = [
//         new CognitoUserAttribute({ Name: "email", Value: email }),
//     ];

//     return userPool.signUp(email, password, attributeList, null);
// };

// export const signIn = (email, password) => {
//     const userData = {
//         Username: email,
//         Pool: userPool,
//     };
//     const cognitoUser = new CognitoUser(userData);

//     const authDetails = new AuthenticationDetails({
//         Username: email,
//         Password: password,
//     });

//     return new Promise((resolve, reject) => {
//         cognitoUser.authenticateUser(authDetails, {
//             onSuccess: (result) => resolve(result),
//             onFailure: (err) => reject(err),
//         });
//     });
// };

// export const getSession = () => {
//     return userPool.getCurrentUser().getSession();
// };
const {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: 'us-east-1_EEHFcSnH1',
  ClientId: '7isffc9d0krf4ebvf4bu2uslvs',
};

const userPool = new CognitoUserPool(poolData);

const signUp = (email, password) => {
  const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: email }),
  ];

  return userPool.signUp(email, password, attributeList, null);
};

const signIn = (email, password) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err),
    });
  });
};

const getSession = () => {
  const user = userPool.getCurrentUser();
  return user ? user.getSession() : null;
};

module.exports = {
  signUp,
  signIn,
  getSession,
};

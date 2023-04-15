const msal = require("@azure/msal-node");
const MicrosoftGraph = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
const msalConfig = {
  auth: {
    clientId: "160d9c2f-1b16-485e-b226-4b6df751a6dd",
    authority: `https://login.microsoftonline.com/dionysusticketing.onmicrosoft.com`,
    clientSecret: process.env.MSAL_CLIENT_SECRET,
  },
};
const tokenRequest = {
  scopes: ["https://graph.microsoft.com/.default"],
};
class MyAuthenticationProvider {
  async getAccessToken() {
    return new Promise(async (resolve, reject) => {
      const cca = new msal.ConfidentialClientApplication(msalConfig);
      const authResponse = await cca.acquireTokenByClientCredential(
        tokenRequest
      );

      if (authResponse.accessToken && authResponse.accessToken.length !== 0) {
        resolve(authResponse.accessToken);
      } else {
        reject(Error("Error: cannot obtain access token."));
      }
    });
  }
}

module.exports = {
  friendlyName: "Uid to profile",

  description: "",

  inputs: {
    user: {
      type: "string",
      required: true,
      description: "The uid of the user to get the profile",
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    const clientOptions = {
      authProvider: new MyAuthenticationProvider(),
    };

    const client = MicrosoftGraph.Client.initWithMiddleware(clientOptions);
    const result = await client
      .api(
        `/users/${inputs.user}?$select=Identities,Mail,OtherMails,displayName,givenName,surname`
      )
      .get();
    const user = result;
    if (user) {
      if (user.mail) {
        user.email = user.mail;
      } else {
        if (user.otherMails[0]) {
          user.email = user.otherMails[0];
        } else {
          const emailIdentity = user.identities.find(
            (identity) => identity.signInType === "emailAddress"
          );
          if (emailIdentity) {
            user.email = emailIdentity.issuerAssignedId;
          } else {
            user.email = null;
          }
        }
      }
      return {
        uid: inputs.user,
        name: user.displayName,
        email: user.email,
      };
    } else {
      return null;
    }
  },
};

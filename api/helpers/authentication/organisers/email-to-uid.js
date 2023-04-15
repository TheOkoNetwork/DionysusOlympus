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
  friendlyName: "Email to UID",

  description: "",

  inputs: {
    email: {
      type: "string",
      required: true,
      description: "The email address to lookup",
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
      .api(`/users?$select=id,identities`)
      .filter(
        `identities/any(id:id/issuer eq 'dionysusticketing.onmicrosoft.com' and id/issuerAssignedId eq '${inputs.email}')`
      )
      .get();
    const users = result.value;
    if (users.length === 1) {
      return users[0].id;
    } else {
      return null;
    }
  },
};

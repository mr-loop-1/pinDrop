const { ulid } = require("ulid");
const { knex } = require("../database");
const { PinataSDK } = require("pinata");
const config = require("../config");

exports.createUser = async (inputs) => {
  const query = knex.transaction();
  // const query = knex("users");
  const pinata = new PinataSDK({
    pinataJwt: inputs.pinataJwt,
    pinataGateway: inputs.pinataGateway,
  });

  try {
    await pinata.testAuthentication();
  }
  catch(err) {
    throw new Error("The api keys are not valid");
  }

  try {
    const userId = ulid();
    query("users").insert({
      ulid: userId,
      name: inputs.name,
      username: inputs.username,
      password: inputs.hashedPassword,
      email: inputs.email,
      jwt: inputs.pinataJwt,
      gateway: inputs.pinataGateway
    });

    const rootGroup = await pinata.groups.create({
      name: config.rootName,
      isPublic: true,
    });

    const rootId = ulid();

    query("folders").insert({
      ulid: rootId,
      title: config.rootName,
      userId: userId,
      groupId: rootGroup.id,
      parentId: 0,
    });

    const pinDropGroup = await pinata.groups.create({
      name: config.pinDropName,
      isPublic: true,
    });

    query("folders").insert({
      ulid: ulid(),
      title: config.pinDropName,
      userId: userId,
      groupId: pinDropGroup.id,
      parentId: rootId,
    });

    (await query).commit();
  }
  catch(err) {
    (await query).rollback();
    throw new Error(err.message);
  }

  return;
};

// this.createUser({pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0ODBiZmU1Ny1jMTdjLTRhZjQtOTU5MS1kZWNlN2QwZTdjOTgiLCJlbWFpbCI6ImFiZHVsc2FtYWQxNDEybWVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijc3M2U5NGY0ZmU2YTQwNWRhNjQ3Iiwic2NvcGVkS2V5U2VjcmV0IjoiZDUwMzc0ZmFmNzZkMTYyZjEwNThkM2YxZGRjOGM4MWU4OGZmZmIyYWNmYzNiYTA5MDI4Y2RmYmRmMjRjMjA0MyIsImV4cCI6MTc2MDMzNDM2MH0.ZfD3m-AdVm2dacCTFSMfznMqcvib2X5fl_ixEZt9b_4", pinataGateway: "scarlet-useful-limpet-57.mypinata.cloud"})

exports.updateUser = async (inputs) => {};

const { ulid } = require("ulid");
const { knex } = require("../database");
const { PinataSDK } = require("pinata");
const config = require("../config");

exports.createUser = async (inputs) => {
  const query = await knex.transaction();
  const pinata = new PinataSDK({
    pinataJwt: inputs.pinataJwt,
    pinataGateway: inputs.pinataGateway,
  });
  let rootGroup, pinDropGroup;

  try {
    await pinata.testAuthentication();
  } catch (err) {
    throw new Error("The api keys are not valid");
  }

  try {
    const userId = ulid();
    await query("users").insert({
      ulid: userId,
      username: inputs.username,
      password: inputs.hashedPassword,
      email: inputs.email,
      jwt: inputs.pinataJwt,
      gateway: inputs.pinataGateway,
    });

    rootGroup = await pinata.groups.create({
      name: config.rootName,
      isPublic: true,
    });
    console.log("🚀 ~ exports.createUser= ~ rootGroup:", rootGroup);

    const rootId = ulid();

    await query("folders").insert({
      ulid: rootId,
      title: config.rootName,
      userId: userId,
      groupId: rootGroup.id,
      // parentId: ,
    });

    pinDropGroup = await pinata.groups.create({
      name: config.pinDropName,
      isPublic: true,
    });
    console.log("🚀 ~ exports.createUser= ~ pinDropGroup:", pinDropGroup);

    await query("folders").insert({
      ulid: ulid(),
      title: config.pinDropName,
      userId: userId,
      groupId: pinDropGroup.id,
      parentId: rootId,
    });

    (await query).commit();

    return userId;
  } catch (err) {
    (await query).rollback();
    if (rootGroup) {
      await pinata.groups.delete({
        groupId: rootGroup.id,
      });
    }
    if (pinDropGroup) {
      await pinata.groups.delete({
        groupId: pinDropGroup.id,
      });
    }
    throw new Error(err.message);
  }
};

exports.getUser = async (inputs) => {
  const query = knex("users");

  return await query.where("email", inputs.email).first();
};

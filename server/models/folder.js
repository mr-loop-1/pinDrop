const { ulid } = require("ulid");
const { knex } = require("../database");

exports.getFolder = async (inputs) => {
  const pinata = inputs.pinata;
  let folder;
  if (!inputs?.folderId) {
    folder = await knex("folders")
      .where("userId", inputs.user.ulid)
      .whereNull("parentId")
      .first();
  } else {
    folder = await knex("folders")
      .where("ulid", inputs.folderId)
      .where("userId", inputs.user.ulid)
      .first();
  }
  if (!folder) {
    throw new Error("Folder not found");
  }

  const folders = await knex("folders")
    .where("parentId", folder.ulid)
    .where("userId", inputs.user.ulid);

  const files = await pinata.files.list().group(folder.groupId);

  return { folder, folders, files: files.files };
};

exports.createFolder = async (inputs) => {
  console.log("🚀 ~ exports.createFolder= ~ inputs:", inputs);
  const pinata = inputs.pinata;
  let folderGroup, parent;

  if (!inputs?.folderId) {
    parent = await knex("folders")
      .where("userId", inputs.user.ulid)
      .whereNull("parentId")
      .first();
  }

  try {
    folderGroup = await pinata.groups.create({
      name: ulid(),
      isPublic: true,
    });

    await knex("folders").insert({
      ulid: ulid(),
      title: inputs.title,
      userId: inputs.user.ulid,
      groupId: folderGroup.id,
      parentId: inputs?.folderId || parent.ulid,
      path: inputs?.folderId
        ? `${inputs.folderPath}/${inputs.title}`
        : `/${inputs.title}`,
    });
  } catch (error) {
    if (folderGroup) {
      await pinata.groups.delete({
        groupId: folderGroup.id,
      });
    }
    throw new Error(error.message);
  }
};

exports.deleteFolder = async (inputs) => {
  const pinata = inputs.pinata;
  const query = await knex.transaction();

  try {
    const folder = await knex("folders")
      .where("ulid", inputs.folderId)
      .where("userId", inputs.user.ulid)
      .first();

    await query("folders")
      .where("ulid", inputs.folderId)
      .where("userId", inputs.user.ulid)
      .del();

    await pinata.groups.delete({
      groupId: folder.groupId,
    });

    await query.commit();
  } catch (error) {
    console.log("🚀 ~ exports.deleteFolder ~ error:", error);
    await query.rollback();
    throw new Error(error.message);
  }
};

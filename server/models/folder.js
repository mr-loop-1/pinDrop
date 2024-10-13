const { knex } = require("../database");

exports.getFolder = async (inputs) => {
  const pinata = inputs.pinata;

  const folder = await knex("folders").where("ulid", inputs.folderId);

  if (!folder) {
    throw new Error("Folder not found");
  }

  const folders = await knex("folders").where("parentId", inputs.folderId);
  const files = await pinata.files.list().group(folder.groupId);

  return { folders, files };
};

exports.createFolder = async (inputs) => {
  const pinata = inputs.pinata;
  const query = await knex.transaction();
  let folderGroup;

  try {
    folderGroup = await pinata.groups.create({
      name: ulid(),
      isPublic: true,
    });

    await query("folders").insert({
      ulid: ulid(),
      title: inputs.title,
      userId: inputs.user.id,
      groupId: folderGroup.id,
      parentId: inputs.folderId,
    });
  } catch (error) {
    if (folderGroup) {
      await pinata.groups.delete({
        groupId: folderGroup.id,
      });
    }
    throw new Error("Error creating folder");
  }
};

exports.deleteFolder = async (inputs) => {};

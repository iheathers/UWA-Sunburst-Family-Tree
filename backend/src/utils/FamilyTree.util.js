export const buildFamilyTree = (allMembers) => {
  const rootMembers = allMembers.filter((member) => !member.parent);
  const familyTree = [];

  rootMembers.forEach((rootMember) => {
    familyTree.push(buildFamilyNode(rootMember, allMembers));
  });

  return familyTree;
};

export const buildFamilyNode = (member, allMembers) => {
  const node = {
    _id: member._id,
    name: member.name,
    children: [],
  };

  member.children.forEach((childId) => {
    const child = allMembers.find((member) => member._id.equals(childId));
    if (child) {
      node.children.push(buildFamilyNode(child, allMembers));
    }
  });

  return node;
};

// Utility function to build a hierarchical family tree from a list of family members
export const buildFamilyTree = (allMembers) => {
  // Find root members (members without a parent)
  const rootMembers = allMembers.filter((member) => !member.parent);
  const familyTree = [];

  // Iterate through root members to build the family tree
  rootMembers.forEach((rootMember) => {
    familyTree.push(buildFamilyNode(rootMember, allMembers));
  });

  return familyTree; // Return the complete family tree
};

// Recursive function to build a family node and its children
export const buildFamilyNode = (member, allMembers) => {
  // Initialize a new node with basic properties (_id, name, children)
  const node = {
    id: member._id,
    name: member.name,
    children: [],
  };

  // Iterate through the child IDs of the current member
  member.children.forEach((childId) => {
    // Find the child member with a matching _id
    const child = allMembers.find((member) => member._id.equals(childId));

    if (child) {
      // Recursively build child nodes and add them to the current node's children
      node.children.push(buildFamilyNode(child, allMembers));
    }
  });

  return node; // Return the constructed family node
};

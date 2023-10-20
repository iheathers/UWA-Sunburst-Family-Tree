// This function checks if a user is one of the default admin users

export const checkDefaultAdmin = (email) => {
  const defaultAdmins = ["nima519@gmail.com", "admin@admin.com"];
  return defaultAdmins.includes(email);
};

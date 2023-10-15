export function formatDateToAustralian(dateString) {
  if (!dateString) return "";

  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-AU", options);
}

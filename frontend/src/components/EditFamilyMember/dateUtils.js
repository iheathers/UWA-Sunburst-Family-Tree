export function removeTimeFromDate(dateString) {
  if (!dateString) {
    return "";
  }
  return dateString.substring(0, 10);
}

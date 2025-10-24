export async function getIcon(iconSubPath) {
  const { default: icon } = await import(`@icons/${iconSubPath}`);
  return icon;
}

export function capitalizeFirst(string) {
  return string[0].toUpperCase() + string.slice(1);
}

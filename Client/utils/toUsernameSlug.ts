export function toUsernameSlug(name?: string, decode = false) {
  if (!name) return null;

  if (decode) {
    return name
      .replace(/-/g, ' ')
      .trim();
  }

  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// console.log(toUsernameSlug("Maximilian Gerste"));
// console.log(toUsernameSlug("Maximilian-Gerste", true));

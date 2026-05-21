interface Product {
  nombre: string;
}

export const sortProducts = <T extends Product>(items: T[], search: string) => {
  const lowerSearch = search.toLowerCase();

  const score = (name: string) => {
    const lower = name.toLowerCase();

    if (lower === lowerSearch) return 0;

    // palabra exacta
    if (lower.split(" ").includes(lowerSearch)) return 1;

    if (lower.startsWith(lowerSearch)) return 2;

    if (lower.includes(lowerSearch)) return 3;

    return 4;
  };

  return [...items].sort((a, b) => {
    const s1 = score(a.nombre);
    const s2 = score(b.nombre);

    if (s1 !== s2) return s1 - s2;

    return a.nombre.localeCompare(b.nombre);
  });
};

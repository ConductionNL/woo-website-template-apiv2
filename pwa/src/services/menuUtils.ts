export const isEntityVisibleForUser = (entity: any, userIsAuthenticated: boolean, userGroups: string[]): boolean => {
  if (!entity) return false;

  const requiresAuth: boolean = Boolean(entity?.authRequired ?? entity?.requiresAuth ?? entity?.protected);
  if (requiresAuth && !userIsAuthenticated) return false;

  const allowedGroups: string[] =
    (Array.isArray(entity?.groups) && entity.groups) ||
    (Array.isArray(entity?.roles) && entity.roles) ||
    (Array.isArray(entity?.allowedGroups) && entity.allowedGroups) ||
    [];

  if (allowedGroups.length > 0) {
    const hasIntersection = userGroups.some((g) => allowedGroups.includes(g));
    if (!hasIntersection) return false;
  }

  return true;
};

export const processMenuTemplate = (text: string): string => {
  if (typeof text !== "string") return "";
  const organisation = window.sessionStorage.getItem("ORGANISATION_NAME") ?? "";
  const year = String(new Date().getFullYear());

  return text
    .replace(/\{\s*ORGANISATION_NAME\s*\}/gi, organisation)
    .replace(/\{\s*YEAR\s*\}/gi, year)
    .replace(/\$\{\s*ORGANISATION_NAME\s*\}/gi, organisation)
    .replace(/\$\{\s*YEAR\s*\}/gi, year);
};

export const filterMenuItemsByVisibility = (
  items: any[] = [],
  userIsAuthenticated: boolean,
  userGroups: string[],
): any[] =>
  items
    .filter((item: any) => isEntityVisibleForUser(item, userIsAuthenticated, userGroups))
    .map((item: any) => {
      const name = processMenuTemplate(item?.name ?? item?.title ?? "");
      const hasLink = Boolean(item?.link ?? item?.href ?? item?.url ?? item?.path);
      const slug: string | undefined = item?.slug;
      const fallbackLink = !hasLink && typeof slug === "string" && slug.length > 0 ? `/${slug}` : undefined;

      return {
        ...item,
        name,
        link: item?.link ?? fallbackLink,
      };
    });

export const getMenusFromPositions = (
  items: any[],
  positions: number[],
  userIsAuthenticated: boolean = false,
  userGroups: string[] = [],
) => {
  if (!Array.isArray(items) || items.length === 0) return [];

  const menusAtPositions = items
    .map((m: any, index: number) => ({ ...m, _originalIndex: index }))
    .filter((m: any) => m && positions.includes(Number(m?.position ?? m?.pos)));

  return menusAtPositions
    .filter((menu: any) => isEntityVisibleForUser(menu, userIsAuthenticated, userGroups))
    .sort((a: any, b: any) => {
      const posA = Number(a?.position ?? a?.pos);
      const posB = Number(b?.position ?? b?.pos);
      // Sort by position first (3, 4, 5)
      if (posA !== posB) return posA - posB;
      // If same position, maintain original order (left to right)
      return a._originalIndex - b._originalIndex;
    })
    .map((menu: any) => ({
      ...menu,
      name: processMenuTemplate(menu?.name ?? menu?.title ?? ""),
      items: filterMenuItemsByVisibility(
        menu?.items ?? menu?.links ?? menu?.children ?? [],
        userIsAuthenticated,
        userGroups,
      ),
    }));
};

export const getMenuFromPosition = (
  items: any[],
  position: number,
  userIsAuthenticated: boolean = false,
  userGroups: string[] = [],
) => getMenusFromPositions(items, [position], userIsAuthenticated, userGroups)[0] ?? null;

// Specific selection logic for position 1 (top-right):
// pick the first menu with position 1 where hideBeforeLogin === false (supports hidebeforeLogin casing too)
export const getTopRightMenu = (items: any[], userIsAuthenticated: boolean = false, userGroups: string[] = []) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  const menusAtPosition = items.filter((m: any) => Number(m?.position ?? m?.pos) === 1);
  if (menusAtPosition.length === 0) return null;

  const pickFirstVisible = menusAtPosition.find(
    (m: any) => Boolean(m?.hideBeforeLogin ?? m?.hidebeforeLogin) === false,
  );

  const selected = pickFirstVisible ?? null;
  if (!selected) return null;

  return {
    ...selected,
    name: processMenuTemplate(selected?.name ?? selected?.title ?? ""),
    items: filterMenuItemsByVisibility(
      selected?.items ?? selected?.links ?? selected?.children ?? [],
      userIsAuthenticated,
      userGroups,
    ),
  };
};

export type AdminSection = "dashboard" | "articles" | "projets" | "contacts" | "registrations" | "equipe";
export type AdminMode = "dashboard" | "list" | "create" | "edit" | "view";

export type ParsedAdminLocation = {
  section: AdminSection;
  mode: AdminMode;
  id: number | null;
};

const ADMIN_SECTIONS: AdminSection[] = ["dashboard", "articles", "projets", "contacts", "registrations", "equipe"];

export function isAdminSection(value: string): value is AdminSection {
  return ADMIN_SECTIONS.includes(value as AdminSection);
}

export function parseAdminLocation(pathname: string): ParsedAdminLocation {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] !== "admin" || segments.length === 0) {
    return { section: "dashboard", mode: "dashboard", id: null };
  }

  if (segments.length === 1) {
    return { section: "dashboard", mode: "dashboard", id: null };
  }

  const section = isAdminSection(segments[1]) ? segments[1] : "dashboard";
  if (section === "dashboard") {
    return { section: "dashboard", mode: "dashboard", id: null };
  }

  if (segments.length === 2) {
    return { section, mode: "list", id: null };
  }

  if (segments[2] === "new") {
    return { section, mode: "create", id: null };
  }

  const id = Number(segments[2]);
  if (!Number.isFinite(id)) {
    return { section, mode: "list", id: null };
  }

  if (segments[3] === "edit") {
    return { section, mode: "edit", id };
  }

  return { section, mode: "view", id };
}

export function buildAdminPath(section: AdminSection, mode: AdminMode, id?: number | null) {
  if (section === "dashboard") return "/admin";
  if (mode === "list") return `/admin/${section}`;
  if (mode === "create") return `/admin/${section}/new`;
  if (mode === "edit" && typeof id === "number") return `/admin/${section}/${id}/edit`;
  if (mode === "view" && typeof id === "number") return `/admin/${section}/${id}`;
  return `/admin/${section}`;
}

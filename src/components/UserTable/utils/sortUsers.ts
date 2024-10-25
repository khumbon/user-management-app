import { User } from "../../../api";

export const sortUsers = (
  users: User[],
  sortColumn: keyof User | null,
  sortOrder: "asc" | "desc",
): User[] => {
  if (!sortColumn) return users;

  return [...users].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });
};

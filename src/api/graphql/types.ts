export type Gender = "Male" | "Female" | "Non-binary" | "Other"

export type User = {
  id: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  age: number;
};

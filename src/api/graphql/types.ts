export type Gender = "Male" | "Female";

export type User = {
  id: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  age: number;
};

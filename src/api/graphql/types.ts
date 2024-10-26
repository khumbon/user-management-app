export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

export type User = {
  id: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  age: number;
};

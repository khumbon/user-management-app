export enum Gender {
  Male = "Male",
  Female = "Female",
}

export type User = {
  id: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  age: number;
};

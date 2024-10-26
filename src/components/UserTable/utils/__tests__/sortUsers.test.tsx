import { Gender, User } from "../../../../api/graphql/types";
import { sortUsers } from "../sortUsers";

describe("sortUsers function", () => {
  const users: User[] = [
    {
      id: "1",
      gender: Gender.MALE,
      firstName: "John",
      lastName: "Doe",
      age: 30,
    },
    {
      id: "2",
      gender: Gender.FEMALE,
      firstName: "Jane",
      lastName: "Smith",
      age: 25,
    },
  ];

  it("sorts users by age in ascending order", () => {
    const sortedUsers = sortUsers(users, "age", "asc");
    expect(sortedUsers[0].age).toBe(25);
    expect(sortedUsers[1].age).toBe(30);
  });

  it("sorts users by last name in descending order", () => {
    const sortedUsers = sortUsers(users, "lastName", "desc");
    expect(sortedUsers[0].lastName).toBe("Smith");
    expect(sortedUsers[1].lastName).toBe("Doe");
  });
});

import Detail from "@models/details";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  await connectToDB();
  const data = await request.json();
  console.log(data);
  try {
    const newUser = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    const createdUser = await Detail.create(newUser);
    return new Response(createdUser, { status: 201 });
  } catch (error) {
    console.log(error, "Failed to add user to database");
  }
};

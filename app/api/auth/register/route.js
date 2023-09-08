import Detail from "@models/details";
import { headers } from "@next.config";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  await connectToDB();
  const data = await request.json();
  if (!data.password || !data.name || !data.phone) {
    return new Response(
      JSON.stringify({ message: "Password/Name/Phone field is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  try {
    const isPresent = Detail.findOne({ email: data.email });
    if (isPresent) {
      return new Response(
        JSON.stringify({ message: "User already registered, please sign in" }),
        {
          status: 302,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
      };
      const createdUser = await Detail.create(newUser);
      return new Response(createdUser, { status: 201 });
    }
  } catch (error) {
    console.log(error, "Failed to add user to database");
  }
};

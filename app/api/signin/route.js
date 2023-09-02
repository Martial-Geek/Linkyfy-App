import User from "../../../models/user.js";
import { connectToDB } from "@utils/database.js";

export const POST = async (request, res) => {
  try {
    const requestData = await request.json();
    const { email } = requestData;
    console.log(email);

    await connectToDB();

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return new Response(
        JSON.stringify({ message: "Successfully signed In" }),
        {
          status: 201,
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Please Sign Up" }), {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response("Failed to sign in", { status: 500 });
  }
};

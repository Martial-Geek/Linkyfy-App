import User from "../../../models/user.js";
import { connectToDB } from "@utils/database.js";

export const POST = async (request, res) => {
  try {
    const requestData = await request.json();
    const { name, email, phone } = requestData;
    console.log(name, email, phone);

    await connectToDB();

    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      await User.create({
        name: name,
        email: email,
        phone: phone,
      });

      return new Response(JSON.stringify({ message: "User created" }), {
        status: 201,
      });
    } else {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 200,
      });
    }

    // const newUser = new User({ name, email, phone });
    // await newUser.save();
    // return new Response(JSON.stringify({ message: "User created" }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};

import Profile from "@models/profile";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  const id = params.id;
  try {
    await connectToDB();
    const profile = await Profile.find({ creator: { $ne: id } }).exec();
    return new Response(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch profiles of users", {
      status: 500,
    });
  }
};

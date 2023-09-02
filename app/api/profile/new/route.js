import Profile from "@models/profile";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { pfp, userId } = await request.json();

  console.log(pfp, userId);

  try {
    await connectToDB();
    const newProfile = { creator: userId, pfp: pfp };

    await Profile.create(newProfile);
    return new Response(JSON.stringify(newProfile), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new profile", { status: 500 });
  }
};

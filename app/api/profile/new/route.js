import Profile from "@models/profile";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { pfp, userId } = await request.json();

  console.log(pfp, userId);

  try {
    await connectToDB();
    // const isPresent = Profile.find({ creator: userId });
    const updatedProfile = await Profile.findOneAndUpdate(
      { creator: userId },
      { pfp: pfp },
      {
        new: true, // Return the updated document if found
      }
    );
    if (!updatedProfile) {
      const newProfile = { creator: userId, pfp: pfp };
      await Profile.create(newProfile);
      return new Response(JSON.stringify(newProfile), { status: 201 });
    }
    return new Response(JSON.stringify(updatedProfile), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new profile", { status: 500 });
  }
};

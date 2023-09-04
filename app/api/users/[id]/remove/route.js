import Detail from "@models/details";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { id: senderId, receiverId } = await request.json();

  try {
    await connectToDB();

    const isPresent = await Detail.findOne({ _id: senderId }).exec();

    if (isPresent) {
      // Use $push to add receiverId to the connections array
      await Detail.updateOne(
        { _id: senderId },
        { $pull: { connections: receiverId } }
      );
      await Detail.updateOne(
        { _id: receiverId },
        { $pull: { connections: senderId } }
      );

      return new Response("Successful", { status: 201 });
    } else {
      return new Response("Sender not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response("Failed to create a new connection", { status: 500 });
  }
};

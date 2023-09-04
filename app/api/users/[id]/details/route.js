import Detail from "@models/details";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  const id = params.id;
  try {
    await connectToDB();
    const details = await Detail.find({ _id: { $ne: id } }).exec();
    return new Response(JSON.stringify(details), { status: 200 });
  } catch (error) {
    return new Response("Failed to find users", {
      status: 500,
    });
  }
};

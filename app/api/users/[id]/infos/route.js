import Info from "@models/info";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  const id = params.id;
  try {
    await connectToDB();
    const infos = await Info.find({ creator: { $ne: id } }).exec();

    return new Response(JSON.stringify(infos), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch profiles of users", {
      status: 500,
    });
  }
};

import Info from "@models/info";
import Profile from "@models/profile";
import Detail from "@models/details";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  const id = params.id;
  try {
    await connectToDB();

    const currentUser = await Detail.findById(id).exec();
    const connections = currentUser.connections || [];

    const infos = await Info.find({
      creator: { $ne: id, $in: connections },
    }).exec();
    const profile = await Profile.find({
      creator: { $ne: id, $in: connections },
    }).exec();
    const details = await Detail.find({
      _id: { $ne: id, $in: connections },
    }).exec();

    const response = { infos, profile, details };
    if (response.infos.length === 0) return new Response(null, { status: 201 });
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch profiles of users", {
      status: 500,
    });
  }
};

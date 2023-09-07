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

    const users = await Detail.find({ _id: { $ne: id, $in: connections } });
    const userIds = users.map((user) => user._id);

    const getResponse = async () => {
      const Users = await Promise.all(
        userIds.map(async (userId) => {
          const user = {};
          user.id = userId;

          const LoginData = await Detail.findOne({
            _id: { $in: userId },
          })
            .select("name")
            .exec();

          user.name = LoginData.name;

          const profileData = (await Profile.findOne({
            creator: { $in: userId },
          })
            .select("pfp")
            .exec()) || {
            pfp: "https://firebasestorage.googleapis.com/v0/b/oruphones-90c0b.appspot.com/o/Oruphones%2Fimages%2Fcommon%20pfp%2FuserLogo.png?alt=media&token=c2923741-6738-44cb-951e-614e7b98596f",
          };

          user.pfp = profileData.pfp;

          const jobData = (await Info.findOne({
            creator: { $in: userId },
          }).exec()) || { experiences: [{ jobType: "", companyName: "" }] };

          user.jobType = jobData.experiences[0].jobType;
          user.companyName = jobData.experiences[0].companyName;

          return user;
        })
      );

      return Users;
    };

    const response = await getResponse();

    if (response.length === 0) return new Response(null, { status: 201 });
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch profiles of users", {
      status: 500,
    });
  }
};

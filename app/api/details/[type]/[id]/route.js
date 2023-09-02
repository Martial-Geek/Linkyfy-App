import Info from "@models/info";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  const type = params.type;
  const userId = params.id;

  console.log(userId, type);

  switch (type) {
    case "about":
      try {
        await connectToDB();
        const info = await Info.findOne({ creator: userId }).exec();

        if (info && info.about) {
          return new Response(JSON.stringify({ aboutMeExists: true }), {
            status: 200,
          });
        } else {
          return new Response(JSON.stringify({ aboutMeExists: false }), {
            status: 200,
          });
        }
      } catch (error) {
        console.error(error);
        return new Response("Failed to check about section", { status: 500 });
      }

    case "skills":
      break;

    case "education":
      break;

    case "experience":
      break;

    default:
      break;
  }
};

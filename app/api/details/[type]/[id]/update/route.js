import Info from "@models/info";
import { connectToDB } from "@utils/database";
export const POST = async (request, { params }) => {
  const typeOfParam = params.type;
  const userId = params.id;

  switch (typeOfParam) {
    case "about":
      const { aboutMe } = await request.json();
      try {
        await connectToDB();
        await Info.updateOne({ creator: userId }, { $set: { about: aboutMe } });
        return new Response("About me updates successfully", { status: 201 });
      } catch (error) {
        return new Response("Failed to update about section", { status: 500 });
      }
    default:
      console.log("Invalid Choice");
  }
};

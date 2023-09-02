import Info from "@models/info";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  const userId = params.id;
  try {
    await connectToDB();
    const info = await Info.findOne({ creator: userId }).exec();

    const response = {
      aboutMeExists: !!info?.about?.trim(),
      skillsExist: Array.isArray(info?.skills) && info.skills.length > 0,
      educationExists: !!(
        info?.education?.collegeName ||
        info?.education?.startingYear ||
        info?.education?.endingYear ||
        info?.education?.courseName ||
        info?.education?.description
      ),
      experienceExists:
        Array.isArray(info?.experiences) && info.experiences.length > 0,
      certificationExists:
        Array.isArray(info?.certifications) && info.certifications.length > 0,
      info,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to check information sections", {
      status: 500,
    });
  }
};

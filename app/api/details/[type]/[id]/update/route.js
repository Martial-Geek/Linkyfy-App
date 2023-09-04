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

    case "skills":
      const { skillsUser } = await request.json();
      try {
        await connectToDB();
        await Info.updateOne(
          { creator: userId },
          { $set: { skills: skillsUser } }
        );
        return new Response("About me updates successfully", { status: 201 });
      } catch (error) {
        return new Response("Failed to update about section", { status: 500 });
      }

    case "education":
      const updatedEducation = await request.json();
      console.log(updatedEducation);
      try {
        await connectToDB();
        await Info.updateOne(
          { creator: userId },
          { $set: { education: updatedEducation } }
        );
        return new Response("About me updates successfully", { status: 201 });
      } catch (error) {
        return new Response("Failed to update about section", { status: 500 });
      }

    case "certifications":
      const updatedCertificationsArray = await request.json();
      try {
        await connectToDB();

        await Info.updateOne(
          { creator: userId },
          { $set: { certifications: updatedCertificationsArray } }
        );

        return new Response("Certifications added successfully", {
          status: 201,
        });
      } catch (error) {
        return new Response("Failed to add certification section", {
          status: 500,
        });
      }

    case "experiences":
      const updatedExperiencesArray = await request.json();
      try {
        await connectToDB();

        await Info.updateOne(
          { creator: userId },
          { $set: { experiences: updatedExperiencesArray } }
        );

        return new Response("Experiences updated successfully", {
          status: 201,
        });
      } catch (error) {
        return new Response("Failed to update experience section", {
          status: 500,
        });
      }

    default:
      console.log("Invalid Choice");
  }
};

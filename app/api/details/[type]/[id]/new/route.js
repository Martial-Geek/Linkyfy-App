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
        const newAboutInfo = { creator: userId, about: aboutMe };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { about: aboutMe } }
          );
        } else {
          await Info.create(newAboutInfo);
          return new Response(newAboutInfo, { status: 201 });
        }

        return new Response("About me added successfully", { status: 201 });
      } catch (error) {
        return new Response("Failed to add about section", { status: 500 });
      }
      break;

    case "skills":
      const { skillsUser } = await request.json();
      try {
        await connectToDB();
        const newSkillInfo = { creator: userId, skills: skillsUser };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { skills: skillsUser } }
          );
        } else {
          await Info.create(newSkillInfo);
          return new Response(newSkillInfo, { status: 201 });
        }

        return new Response("Skills added successfully", { status: 201 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to add skills", { status: 500 });
      }
      break;

    case "education":
      const educationUser = await request.json();
      try {
        await connectToDB();
        const newEduInfo = { creator: userId, education: educationUser };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { education: educationUser } }
          );
        } else {
          await Info.create(newEduInfo);
          return new Response(newEduInfo, { status: 201 });
        }

        return new Response("Education added successfully", { status: 201 });
      } catch (error) {
        return new Response("Failed to add education section", { status: 500 });
      }
      break;

    case "experiences":
      const experiences = await request.json();
      try {
        await connectToDB();
        const newExpInfo = { creator: userId, experiences: experiences };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { experiences: experiences } }
          );
        } else {
          await Info.create(newExpInfo);
          return new Response(newExpInfo, { status: 201 });
        }

        return new Response("Experiences added successfully", { status: 201 });
      } catch (error) {
        return new Response("Failed to add experience section", {
          status: 500,
        });
      }
      break;

    case "certifications":
      const certifications = await request.json();
      try {
        await connectToDB();
        const newCertInfo = { creator: userId, certifications: certifications };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { certifications: certifications } }
          );
        } else {
          await Info.create(newCertInfo);
          return new Response(newCertInfo, { status: 201 });
        }

        return new Response("Certifications added successfully", {
          status: 201,
        });
      } catch (error) {
        return new Response("Failed to add certification section", {
          status: 500,
        });
      }
      break;

    case "exist":
      const isExist = await request.json();

      try {
        await connectToDB();
        const newExistInfo = { creator: userId, exist: isExist };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { exist: isExist } }
          );
        } else {
          await Info.create(newExistInfo);
          return new Response(newExistInfo, { status: 201 });
        }

        return new Response("Truth added successfully", {
          status: 201,
        });
      } catch (error) {
        return new Response("Failed to add truth section", {
          status: 500,
        });
      }
      break;

    default:
      console.log("Unknown Param");
      break;
  }
};

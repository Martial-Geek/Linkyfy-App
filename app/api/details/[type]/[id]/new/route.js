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
        const newInfo = { creator: userId, about: aboutMe };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { about: aboutMe } }
          );
        } else {
          await Info.create({ creator: userId, about: aboutMe });
        }

        return new Response("About me added successfully", { status: 201 });
      } catch (error) {
        return new Response("Failed to add about section", { status: 500 });
      }

    case "skills":
      const { skillsUser } = await request.json();
      try {
        await connectToDB();

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { skills: skillsUser } }
          );
        } else {
          await Info.create({ creator: userId, skills: skillsUser });
        }

        return new Response("Skills added successfully", { status: 201 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to add skills", { status: 500 });
      }

    case "education":
      const educationUser = await request.json();
      try {
        await connectToDB();
        const newInfo = { creator: userId, education: educationUser };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { education: educationUser } }
          );
        } else {
          await Info.create({ newInfo });
        }

        return new Response("Education added successfully", { status: 201 });
      } catch (error) {
        return new Response("Failed to add education section", { status: 500 });
      }

    case "experiences":
      const experiences = await request.json();
      try {
        await connectToDB();
        const newInfo = { creator: userId, experiences: experiences };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { experiences: experiences } }
          );
        } else {
          await Info.create(newInfo);
        }

        return new Response("Experiences added successfully", { status: 201 });
      } catch (error) {
        return new Response("Failed to add experience section", {
          status: 500,
        });
      }

    case "certifications":
      const certifications = await request.json();
      try {
        await connectToDB();
        const newInfo = { creator: userId, certifications: certifications };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { certifications: certifications } }
          );
        } else {
          await Info.create(newInfo);
        }

        return new Response("Certifications added successfully", {
          status: 201,
        });
      } catch (error) {
        return new Response("Failed to add certification section", {
          status: 500,
        });
      }

    case "exist":
      const isExist = await request.json();

      try {
        await connectToDB();
        const newInfo = { creator: userId, exist: isExist };

        const isPresent = await Info.findOne({ creator: userId }).exec();

        if (isPresent) {
          await Info.updateOne(
            { creator: userId },
            { $set: { exist: isExist } }
          );
        } else {
          await Info.create(newInfo);
        }

        return new Response("Truth added successfully", {
          status: 201,
        });
      } catch (error) {
        return new Response("Failed to add truth section", {
          status: 500,
        });
      }

    default:
      console.log("Unknown Param");
      break;
  }
};

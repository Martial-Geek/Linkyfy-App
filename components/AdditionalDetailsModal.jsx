import React, { useState } from "react";
import Modal from "react-modal";

const AdditionalDetailsModal = ({ isOpen, onClose }) => {
  const [about, setAbout] = useState("");
  const [school, setSchool] = useState("");
  const [userDetails, setUserDetails] = useState({
    aboutMe: "",
    skills: [],
    education: {
      collegeName: "",
      startingDate: "",
      endingDate: "",
      courseName: "",
      description: "",
    },
    // experience: {
    //   duration: 0,
    //   startingDate: "",
    //   endingDate: "",
    //   companyName: "",
    //   jobtype: "",
    //   jobstatus: "",
    // },
    experiences: [],
  });

  // console.log(userDetails);

  const { aboutMe, skills, education, experiences } = userDetails;
  // Other state variables for other details

  const handleSubmit = () => {
    // Send the details to the server
    // Close the modal
  };

  const handleEducationChange = (newEducation) => {
    setUserDetails({
      ...userDetails,
      education: {
        ...userDetails.education,
        ...newEducation,
      },
    });
  };

  const handleExperienceChange = (index, newExperience) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = newExperience;
    setUserDetails({
      ...userDetails,
      experiences: updatedExperiences,
    });
  };

  const handleAddExperience = () => {
    setUserDetails({
      ...userDetails,
      experiences: [
        ...experiences,
        {
          duration: 0,
          startingDate: "",
          endingDate: "",
          companyName: "",
          jobType: "",
          jobStatus: "",
        },
      ],
    });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setUserDetails({
      ...userDetails,
      experiences: updatedExperiences,
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2 className="head_text">Provide Additional Details</h2>

      {/* FORM  */}
      <form
        className="mt-10 w-full max-w-full flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          {/* left side of the form  */}

          {/* About  */}

          <div className="flex flex-col w-1/3 px-14">
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                About
              </span>
            </label>
            <textarea
              className="form_textarea"
              value={aboutMe}
              onChange={(e) => {
                console.log(e.target.value);
                setUserDetails({ ...userDetails, aboutMe: e.target.value });
              }}
            />
            {/* Similar inputs for other details */}

            {/* <label className="flex flex-col">
              <span className="font-satoshi font-semibold text-base text-gray-700">
                School
              </span>
              <input
                // value={post.tag}
                onChange={(e) => setPost({ ...post, tag: e.target.value })}
                type="text"
                placeholder="School Name"
                required
                className="form_input"
              />
            </label> */}

            {/* Skills  */}

            <div className="flex flex-col">
              <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  Skills
                </span>
              </label>

              {skills.map((skill, index) => (
                <div className="flex flex-col" key={index}>
                  <input
                    className="form_input w-6/12"
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const updatedSkills = [...skills];
                      updatedSkills[index] = e.target.value;
                      setUserDetails({ ...userDetails, skills: updatedSkills });
                    }}
                  />

                  <button
                    className="px-5 py-1.5 my-5 text-sm bg-primary-orange rounded-full text-white max-w-fit self-end"
                    type="button"
                    onClick={() => {
                      const updatedSkills = [...skills];
                      updatedSkills.splice(index, 1);
                      setUserDetails({ ...userDetails, skills: updatedSkills });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="px-5 py-1.5 my-3 text-sm bg-primary-orange rounded-full text-white max-w-fit"
                onClick={() => {
                  setUserDetails({ ...userDetails, skills: [...skills, ""] });
                }}
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Middle side of form  */}

          {/* Education  */}

          <div className="flex flex-col w-1/3 px-14">
            <div className="flex flex-col">
              <h2 className="desc">Education</h2>
              <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  College Name
                </span>
                <input
                  className="form_input"
                  type="text"
                  value={userDetails.education.collegeName}
                  onChange={(e) =>
                    handleEducationChange({ collegeName: e.target.value })
                  }
                />
              </label>
              <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  Starting Date
                </span>
                <input
                  className="form_input"
                  type="text"
                  value={userDetails.education.startingDate}
                  onChange={(e) =>
                    handleEducationChange({ startingDate: e.target.value })
                  }
                />
              </label>
              <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  Ending Date
                </span>
                <input
                  className="form_input"
                  type="text"
                  value={userDetails.education.endingDate}
                  onChange={(e) =>
                    handleEducationChange({ endingDate: e.target.value })
                  }
                />
              </label>
              <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  Course Name
                </span>
                <input
                  className="form_input"
                  type="text"
                  value={userDetails.education.courseName}
                  onChange={(e) =>
                    handleEducationChange({ courseName: e.target.value })
                  }
                />
              </label>
              <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  Description
                </span>
                <textarea
                  className="form_textarea"
                  value={userDetails.education.description}
                  onChange={(e) =>
                    handleEducationChange({ description: e.target.value })
                  }
                />
              </label>
            </div>
          </div>

          {/* Experience  */}

          <div className="flex flex-col w-1/3 px-14">
            {experiences.map((experience, index) => (
              <div className="flex flex-col w-full px-14" key={index}>
                <h2 className="desc">Experience {index + 1}</h2>
                <label>
                  <span className="font-satoshi font-semibold text-base text-gray-700">
                    Duration (in months)
                  </span>
                  <input
                    className="form_input"
                    type="number"
                    value={experience.duration}
                    onChange={(e) =>
                      handleExperienceChange(index, {
                        ...experience,
                        duration: parseFloat(e.target.value),
                      })
                    }
                  />
                </label>
                <label>
                  <span className="font-satoshi font-semibold text-base text-gray-700">
                    Starting Date
                  </span>
                  <input
                    className="form_input"
                    type="text"
                    value={experience.startingDate}
                    onChange={(e) =>
                      handleExperienceChange(index, {
                        ...experience,
                        startingDate: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  <span className="font-satoshi font-semibold text-base text-gray-700">
                    Ending Date
                  </span>
                  <input
                    className="form_input"
                    type="text"
                    value={experience.endingDate}
                    onChange={(e) =>
                      handleExperienceChange(index, {
                        ...experience,
                        endingDate: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  <span className="font-satoshi font-semibold text-base text-gray-700">
                    Company Name
                  </span>
                  <input
                    className="form_input"
                    type="text"
                    value={experience.companyName}
                    onChange={(e) =>
                      handleExperienceChange(index, {
                        ...experience,
                        companyName: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  <span className="font-satoshi font-semibold text-base text-gray-700">
                    Job Type
                  </span>
                  <input
                    className="form_input"
                    type="text"
                    value={experience.jobType}
                    onChange={(e) =>
                      handleExperienceChange(index, {
                        ...experience,
                        jobType: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  <span className="font-satoshi font-semibold text-base text-gray-700">
                    Job Status
                  </span>
                  <input
                    className="form_input"
                    type="text"
                    value={experience.jobStatus}
                    onChange={(e) =>
                      handleExperienceChange(index, {
                        ...experience,
                        jobStatus: e.target.value,
                      })
                    }
                  />
                </label>
                <button
                  className="px-5 py-1.5 my-3 text-sm bg-primary-orange rounded-full text-white max-w-fit"
                  type="button"
                  onClick={() => handleRemoveExperience(index)}
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              className="px-5 py-1.5 my-3 text-sm bg-primary-orange rounded-full text-white max-w-fit s"
              type="button"
              onClick={handleAddExperience}
            >
              Add Experience
            </button>
          </div>
        </div>

        {/* Submit Button  */}

        <button
          className="px-5 py-1.5 my-3 text-sm bg-primary-orange rounded-full text-white max-w-fit"
          type="submit"
        >
          Submit
        </button>
      </form>

      {/* Close Button  */}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default AdditionalDetailsModal;

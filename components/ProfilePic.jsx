"use client";

import React from "react";
import Image from "next/image";
import storage from "../firebaseConfig";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";

const ProfilePic = () => {
  const { data: session } = useSession();
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/profile`);
      const data = await response.json();
      console.log(data);

      if (data) setImageURL(data.pfp);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const imageRef = ref(storage, `Oruphones/images/${file.name}`);

    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        try {
          const response = await fetch("/api/profile/new", {
            method: "POST",
            body: JSON.stringify({
              pfp: url,
              userId: session?.user.id,
            }),
          });
        } catch (error) {
          console.log(error.message);
        } finally {
          setImageURL(url);
        }
      });
    });
  };

  return (
    <div className="flex-col justify-center items-center flex md:flex-row md:justify-between md:items-start">
      <div className="mx-8 my-8 rounded-full">
        {imageURL ? (
          <img
            src={imageURL}
            width={150}
            height={150}
            alt="Uploaded Image"
            className="rounded-full mt-4"
          />
        ) : (
          <Image
            src="/icons8-user-48.png"
            width={150}
            height={150}
            alt="Icon"
            className="rounded-full"
          />
        )}
      </div>
      <label className="relative bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 my-4 px-4 rounded-lg shadow-md md:mr-40 md:self-center cursor-pointer">
        Upload Photo
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </label>
    </div>
  );
};

export default ProfilePic;

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { colors, getColor } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import {
  UPDATE_PROFILE_ROUTE,
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
} from "@/utils/constant";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [image, setImage] = useState(userInfo?.image || null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(userInfo?.color || 0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo?.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      // Modified image URL construction
      const imageUrl = userInfo.image.startsWith("http")
        ? userInfo.image
        : `${HOST}/${userInfo.image.replace(/^\/+/, "")}`; // Remove leading slashes
      console.log("Constructed image URL:", imageUrl); // For debugging
      setImage(imageUrl);
    } else {
      setImage(null);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo(response.data);
          toast.success("Profile updated successfully");
          navigate("/chat");
        }
      } catch (e) {
        toast.error("Error saving profile");
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo?.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup your profile");
      navigate("/profile");
    }
  };

  const handleFileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      const formData = new FormData();
      formData.append("profile-image", file);

      try {
        const response = await apiClient.post(
          ADD_PROFILE_IMAGE_ROUTE,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200 && response.data.image) {
          // Modified image URL construction for uploaded image
          const newImageUrl = response.data.image.startsWith("http")
            ? response.data.image
            : `${HOST}/${response.data.image.replace(/^\/+/, "")}`;

          console.log("New image URL:", newImageUrl); // For debugging
          setImage(newImageUrl);
          setUserInfo({ ...userInfo, image: response.data.image });
          toast.success("Profile image updated successfully");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(error.response?.data?.message || "Failed to upload image");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        setImage(null);
        toast.success("Profile image removed successfully");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(error.response?.data?.message || "Failed to delete image");
    }
  };

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack
            className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="flex h-full w-32 md:w-48 relative items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="User Profile"
                  className="w-full h-full bg-black"
                />
              ) : (
                <AvatarFallback
                  className={`h-32 w-32 md:h-48 md:w-48 text-5xl font-bold border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.charAt(0).toUpperCase()
                    : userInfo?.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              )}
            </Avatar>
            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full cursor-pointer"
                onClick={image ? handleDeleteImage : handleFileInputClicked}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".png, .jpg, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <Input
              placeholder="Email"
              type="email"
              disabled
              value={userInfo.email}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            />
            <Input
              placeholder="First Name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            />
            <Input
              placeholder="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            />
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`${color} h-8 w-8 rounded-full cursor-pointer ${
                    selectedColor === index ? "outline outline-white/50" : ""
                  }`}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <Button onClick={saveChanges} className="h-16 w-full bg-purple-900">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Profile;

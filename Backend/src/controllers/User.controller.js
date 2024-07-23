import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../configs/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    return { accessToken };
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while generating access token",
    });
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    return res.status(409).json({
      message: `All Fields Required`,
    });
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res.status(409).json({
      message: "User Already Exists",
    });
  }

  await User.create({
    firstName,
    lastName,
    avatar: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
    email,
    password,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid user credentials",
    });
  }

  const { accessToken } = await generateAccessAndRefereshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    return res.status(400).json({
      message: "Avatar file is missing",
    });
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    return res.status(400).json({
      message: "Error while uploading image",
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

export { registerUser, loginUser, logoutUser, updateUserAvatar };

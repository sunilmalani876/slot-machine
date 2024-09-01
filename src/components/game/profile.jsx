import React, { useEffect, useState } from "react";
// import top from "@/assets/resource/wave.png";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import profile from "@/assets/resource/profile.png";
import profileText from "@/assets/resource/profiletext.png";
import Logo from "./logo";
import Cookies from "js-cookie";
import avatar from "@/assets/resource/avatar.png";
import token from "@/assets/resource/token.png";

import { useAuthContext } from "@/context/authContext";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [BoardData, setBoardData] = useState(null);

  const { gameData, setToken, leaderBoardData } = useAuthContext();

  useEffect(() => {
    const getData = async () => {
      const data = await gameData();

      const leaderData = await leaderBoardData();

      console.log(leaderData);
      setProfileData(data);
      setBoardData(leaderData);
    };

    getData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FFA013] relative flex justify-center pt-20">
      <div className="fixed top-0 w-full bg-neutral-100 px-10 py-2 border-b border-gray-300 flex justify-between items-center">
        <Logo />
        <img
          src={profileText}
          width={95}
          height={95}
          className="object-cover max-sm:hidden cursor-pointer"
        />
        <div className="flex justify-end items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="border-none">
            <img
              src={profile}
              width={125}
              height={125}
              className="object-cover cursor-pointer"
            />
          </Button>
          <Button
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("userId");
              setToken(null);
              navigate("/");
            }}
            size="sm"
            className="group font-pocket relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-3.5 text-sm font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          >
            Log-Out
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-7 md:gap-0 md:flex-row mt-3">
        {/* <div className="w-full md:max-w-sm flex flex-col items-center">
          <div
            className="w-full relative max-w-xs flex flex-row-reverse items-center justify-center bg-neutral-100 h-[78px] border-[1.5px] border-gray-500"
            style={{
              borderRadius: "80px 80px 20px 20px",
            }}
          >
            <img
              src={avatar}
              alt="avatar"
              className="object-cover absolute -left-6 -top-0"
              width={100}
            />
            <div className="text-center leading-normal">
              <p className="text-sm font-pocket">Total winning amount</p>
              <div className="w-full gap-2 flex justify-center items-center">
                <img src={token} alt="sub" className="object-cover" />
                <span className="text-2xl font-pocket text-[#FFA826] flex">
                  {profileData?.data[0]?.totalAmountWon}
                </span>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex-1 flex flex-col gap-6 items-center justify-start">
          <div className="w-full md:max-w-sm flex flex-col items-center">
            <div
              className="w-full relative max-w-xs flex flex-row-reverse items-center justify-center bg-neutral-100 h-[78px] border-[1.5px] border-gray-500"
              style={{
                borderRadius: "80px 80px 20px 20px",
              }}
            >
              <img
                src={avatar}
                alt="avatar"
                className="object-cover absolute -left-6 -top-0"
                width={100}
              />
              <div className="text-center leading-normal">
                <p className="text-sm font-pocket">Total winning amount</p>
                <div className="w-full gap-2 flex justify-center items-center">
                  <img src={token} alt="sub" className="object-cover" />
                  <span className="text-2xl font-pocket text-[#FFA826] flex">
                    {profileData?.data[0]?.totalAmountWon}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-start">
            <p className="text-[#CAEA89] font-pocket text-3xl">Leader Board</p>

            <table className="w-full rounded-md max-w-2xl overflow-clip">
              <thead className="w-full bg-white h-10">
                <tr className="bg-neutral-200/50 rounded-md">
                  {["No.", "Name", "Won", "Total Game play"].map((i, index) => (
                    <th className="w-[150px] text-sm text-nowrap" key={index}>
                      {i}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="w-full text-center text-sm font-semibold bg-white">
                {BoardData?.data?.map((data, index) => (
                  <tr
                    key={index}
                    className="h-12 odd:bg-white even:bg-neutral-200/50"
                  >
                    <td className="">{index + 1}.</td>
                    <td className="">{data?.result?.name}</td>
                    <td>{data?.totalWinAmount}</td>
                    <td>{data?.totalGamesPlayed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

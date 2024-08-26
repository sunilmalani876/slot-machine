import React from "react";
import login from "@/assets/resource/login-remover.png";

const SignIn = () => {
  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="w-full text-white px-3.5 py-2.5 sm:px-0 h-full flex justify-center items-center">
        <div className="w-full max-sm:flex-col max-sm:items-center max-sm:gap-8 border-slate-300 rounded-md border-[1px] shadow-sm shadow-slate-700 px-3 py-5 flex justify-center max-w-2xl">
          <div className="p-1">
            <img
              src={login}
              alt="login"
              className="object-cover w-[240px] z-20 sm:w-[280px]"
            />
          </div>

          <div className="max-sm:w-full max-sm:gap-5 flex-1 flex flex-col items-center gap-3">
            <div className="flex flex-col max-sm:py-2 sm:pt-2 items-center gap-2">
              <div className="relative">
                <div className="w-8 h-2 bg-black">ss</div>
                <div>ss</div>
              </div>
              <p className="text-xs font-bold text-gray-500">
                Your Chatting App 🥂.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

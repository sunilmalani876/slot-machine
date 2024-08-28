import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

export const Slots = () => {
  const fruits = ["🍒", "🍉", "🍊", "🍓", "🍇", "🥝"];

  const [fruit1, setFruit1] = useState("🍒");
  const [fruit2, setFruit2] = useState("🍒");
  const [fruit3, setFruit3] = useState("🍒");
  const [rolling, setRolling] = useState(false);

  const slotRefs = [useRef(null), useRef(null), useRef(null)];

  const triggerSlotRotation = (ref) => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    let randomOption = Math.floor(Math.random() * fruits.length);
    let chosenOption = options[randomOption];
    setTop(-chosenOption.offsetTop + 2);
    return fruits[randomOption];
  };

  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 4000);

    slotRefs.forEach((slot, i) => {
      const selected = triggerSlotRotation(slot.current);
      if (i === 0) setFruit1(selected);
      if (i === 1) setFruit2(selected);
      if (i === 2) setFruit3(selected);
    });
  };

  return (
    <div className="w-full relative mx-auto my-auto flex max-w-2xl flex-col gap-5 items-center">
      {/* CARD 1 */}
      <div className="relative w-full max-w-xs h-[80px] rounded-full rounded-tr-none bg-[#341D1A] flex items-center justify-between text-white">
        <img
          src={avatar}
          alt="avatar"
          className="object-cover absolute -left-6 -top-1"
          width={100}
        />
        <div className="w-full font-pocket text-xl text-center text-[#FFA013]">
          Tokio Slots
          <p className="text-white text-xs">Play Now</p>
        </div>

        <div className="absolute -right-5">
          <Button
            asChild
            size="sm"
            className="group cursor-pointer items-center justify-center rounded-xl border text-lg font-medium bg-[#7A85F4] hover:bg-[#7A85F4]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          >
            <Link to="play">
              <img src={youtube} alt="youtube" className="" width={17} />
            </Link>
          </Button>
        </div>
      </div>

      {/* CARD 2 */}
      <div className="relative w-full max-w-xs h-[80px] rounded-full rounded-tr-none bg-[#341D1A] flex items-center justify-between text-white">
        <img
          src={avatar2}
          alt="avatar"
          className="object-cover absolute -left-6 -top-1"
          width={100}
        />
        <div className="w-full font-pocket text-xl text-center text-[#FFA013]">
          Tokio Pool🎱
          <p className="text-white text-xs">Play Now</p>
        </div>

        <div className="absolute -right-5">
          <Button
            asChild
            size="sm"
            className="group cursor-pointer items-center justify-center rounded-xl border text-lg font-medium bg-[#7A85F4] hover:bg-[#7A85F4]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          >
            <Link to="play">
              <img src={youtube} alt="youtube" className="" width={17} />
            </Link>
          </Button>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

// import React, { useState, useRef } from "react";
// import ReactDOM from "react-dom";

// export const Slots = () => {
//   const fruits = ["🍒", "🍉", "🍊", "🍓", "🍇", "🥝"];

//   const [fruit1, setFruit1] = useState("🍒");
//   const [fruit2, setFruit2] = useState("🍒");
//   const [fruit3, setFruit3] = useState("🍒");
//   const [rolling, setRolling] = useState(false);

//   const slotRefs = [useRef(null), useRef(null), useRef(null)];

//   const duration = 3000; // Duration of the roll animation in milliseconds

//   const triggerSlotRotation = (ref) => {
//     function setTop(top) {
//       ref.style.top = `${top}px`;
//     }
//     let options = ref.children;
//     let randomOption = Math.floor(Math.random() * fruits.length);
//     let chosenOption = options[randomOption];
//     setTop(-chosenOption.offsetTop + 2);
//     return fruits[randomOption];
//   };

//   const roll = () => {
//     setRolling(true);

//     // Start slot rotation
//     slotRefs.forEach((slot, i) => {
//       const selected = triggerSlotRotation(slot.current);
//       if (i === 0) setFruit1(selected);
//       if (i === 1) setFruit2(selected);
//       if (i === 2) setFruit3(selected);
//     });

//     // Stop rolling animation after the duration
//     setTimeout(() => {
//       setRolling(false);
//     }, duration);
//   };

//   return (
//     <div className="font-sans text-center">
//       <div className="relative inline-block h-[100px] w-[80px] overflow-hidden">
//         <section className="relative border-2 border-light-gray w-[70px] h-[70px] bg-gray text-white text-center text-[25px] leading-[60px] cursor-default">
//           <div
//             className={`absolute top-0 w-full transition-transform duration-[${duration}ms] ${
//               rolling ? "animate-roll" : ""
//             }`}
//             ref={slotRefs[0]}
//           >
//             {fruits.map((fruit, i) => (
//               <div
//                 key={i}
//                 className="h-[70px] flex items-center justify-center"
//               >
//                 <span>{fruit}</span>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//       <div className="relative inline-block h-[100px] w-[80px] overflow-hidden">
//         <section className="relative border-2 border-light-gray w-[70px] h-[70px] bg-gray text-white text-center text-[25px] leading-[60px] cursor-default">
//           <div
//             className={`absolute top-0 w-full transition-transform duration-[${duration}ms] ${
//               rolling ? "animate-roll" : ""
//             }`}
//             ref={slotRefs[1]}
//           >
//             {fruits.map((fruit, i) => (
//               <div
//                 key={i}
//                 className="h-[70px] flex items-center justify-center"
//               >
//                 <span>{fruit}</span>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//       <div className="relative inline-block h-[100px] w-[80px] overflow-hidden">
//         <section className="relative border-2 border-light-gray w-[70px] h-[70px] bg-gray text-white text-center text-[25px] leading-[60px] cursor-default">
//           <div
//             className={`absolute top-0 w-full transition-transform duration-[${duration}ms] ${
//               rolling ? "animate-roll" : ""
//             }`}
//             ref={slotRefs[2]}
//           >
//             {fruits.map((fruit, i) => (
//               <div
//                 key={i}
//                 className="h-[70px] flex items-center justify-center"
//               >
//                 <span>{fruit}</span>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//       <div
//         className={`w-[215px] cursor-pointer bg-yellow-400 py-2 text-center text-[20px] rounded-[20px] border-2 border-black ${
//           rolling ? "animate-blinkingText" : ""
//         }`}
//         onClick={!rolling ? roll : null}
//         disabled={rolling}
//       >
//         {rolling ? "Rolling..." : "ROLL"}
//       </div>
//       <style>
//         {`
//           @keyframes rollingAnimation {
//             0% { transform: translateY(0); }
//             100% { transform: translateY(-210px); }
//           }
//           .animate-roll {
//             animation: rollingAnimation 3s linear infinite;
//           }
//           @keyframes blinkingText {
//             0% { color: #000; }
//             49% { color: #000; }
//             60% { color: transparent; }
//             99% { color: transparent; }
//             100% { color: #000; }
//           }
//           .animate-blinkingText {
//             animation: blinkingText 1.2s infinite;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

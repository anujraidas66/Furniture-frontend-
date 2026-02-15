export default function Home() {
  return (
    <div className="relative w-full max-w-[1440px] h-[900px] mx-auto bg-amber-100 flex items-center justify-start overflow-hidden">

      {/* Left Text Section */}
      <div className="w-96 relative ml-24">
        <h1 className="text-black text-6xl font-medium font-['Poppins']">
          Rocket Single Seater
        </h1>
        <h2 className="mt-8 text-black text-2xl font-medium font-['Poppins']">
          Shop Now
        </h2>
        <div className="mt-4 w-32 h-0 outline outline-2 outline-black outline-offset-[-1px]" />
      </div>

      {/* Right Image Section */}
      <div className="flex-1 relative">
        <img
          src="./image/sofa1.png"
          alt="Rocket Furniture"
          className="absolute right-0 top-0 h-full w-auto origin-top-left rotate-180 shadow-[0_28px_30px_0_rgba(0,0,0,0.10)]"
        />
      </div>
      
    </div>
  );
}








// export default function Home(){
//   return (
//     <>
//       {/* HERO SECTION */}
//       <section className="bg-[#FCEFBF] min-h-screen flex items-center">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            
//             {/* Left Content */}
//             <div>
//               <h1 className="text-5xl md:text-6xl font-bold leading-tight text-black">
//                 Rocket single <br /> seater
//               </h1>

//               <div className="mt-6">
//                 <a
//                   href="/shop"
//                   className="inline-block text-black font-medium border-b-2 border-black pb-1 hover:opacity-70 transition"
//                 >
//                   Shop Now
//                 </a>
//               </div>
//             </div>

//             {/* Right Image */}
//             <div className="flex justify-center md:justify-end">
//               <img
//                 src="/image/sofa.png"
//                 alt="Rocket single seater"
//                 className="max-w-md w-full object-contain"
//               />
//             </div>

//           </div>
//         </div>
//       </section>

// <section className="bg-[#FCEFBF] py-20">
//   <div className="max-w-6xl mx-auto flex justify-between items-start px-10">

//     {/* Left Item */}
//     <div className="flex flex-col items-center">
//       <img
//         src="/image/sidetable1.png"
//         alt="Side table"
//         className="w-56 mb-6"
//       />
//       <h3 className="text-base font-semibold text-black mb-2">
//         Side table
//       </h3>
//       <p className="text-sm text-black border-b border-black cursor-pointer">
//         View More
//       </p>
//     </div>

//     {/* Right Item */}
//     <div className="flex flex-col items-center">
//       <img
//         src="/image/sidetable2.png"
//         alt="Side table"
//         className="w-56 mb-6"
//       />
//       <h3 className="text-base font-semibold text-black mb-2">
//         Side table
//       </h3>
//       <p className="text-sm text-black border-b border-black cursor-pointer">
//         View More
//       </p>
//     </div>

//   </div>
// </section>



//     </>
//   );
// };





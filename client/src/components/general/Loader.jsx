function Loader({ size = 32 }) {
  return (
    <div className="">
      <div className="flex justify-center items-center ">
        <div
          className={`animate-spin-slow rounded-full h-${size} w-${size} border-8 border-secondary border-t-white `}
        ></div>
      </div>
    </div>
  );
}

export default Loader;

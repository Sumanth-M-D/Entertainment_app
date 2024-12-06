import Navbar from "./Navbar";

function Applayout({ children }) {
  return (
    <div className="flex md:flex-row flex-col gap-8 w-screen ">
      <Navbar />
      <main className="px-4">{children}</main>
    </div>
  );
}

export default Applayout;

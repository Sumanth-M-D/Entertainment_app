import Navbar from "./Navbar";

function Applayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default Applayout;

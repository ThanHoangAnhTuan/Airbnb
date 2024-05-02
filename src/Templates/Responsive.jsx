import { useEffect, useState } from "react";

const Responsive = ({ laptop, tablet, mobile }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [screenWidth]);

  return (
    <>
      {screenWidth >= 1200 && laptop}
      {screenWidth >= 768 && screenWidth < 1200 && tablet}
      {screenWidth < 768 && mobile}
    </>
  );
};

export default Responsive;

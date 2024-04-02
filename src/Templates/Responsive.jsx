import { useCallback, useEffect, useState } from "react";

const Responsive = ({ laptop, tablet, mobile }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [component, setComponent] = useState(laptop);
  const changeScreen = useCallback(() => {
    setScreenWidth(window.innerWidth);
    if (screenWidth >= 1200) {
      setComponent(laptop);
    } else if (screenWidth >= 768 && screenWidth < 1200) {
      setComponent(tablet);
    } else {
      setComponent(mobile);
    }
  }, [screenWidth, laptop, tablet, mobile]);
  useEffect(() => {
    window.addEventListener("resize", changeScreen);
    window.addEventListener("load", changeScreen);
    return () => {
      window.removeEventListener("resize", changeScreen);
      window.removeEventListener("load", changeScreen);
    };
  }, [screenWidth, changeScreen]);
  return <>{component}</>;
};

export default Responsive;

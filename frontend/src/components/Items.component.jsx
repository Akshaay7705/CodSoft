import React, { useContext, useEffect, useState } from "react";
import { editorStateContext } from "../pages/Settings";
import CountryCitySelector from "./SelectCountry.component";
import { Link } from "react-router-dom";

export const Items = ({ name }) => {
  const [currState, setCurrState] = useState(null);
  const { edit, setEdit } = useContext(editorStateContext);

  useEffect(() => {
    handleLoad();
  }, []);

  const handleClick = () => {
    setCurrState(name);
    setEdit(true);
  };

  const handleLoad = () => {
    setCurrState(name);
  };

  const handleLocationSelect = (location) => {
    console.log(location);
  };
  let id = name.replace(/[\s]/g, '-');
      id = id.replace(/[,]/g, '');


  return (
    <div>
        <Link to={`/settings/${id}`}>
        <div
          onClick={handleClick}
          onLoad={handleLoad}
          className="hover:bg-grey p-4 border-b h-[60px] border-grey cursor-pointer"
        >
          <p className="text-p_text capitalize">{name}</p>
          <p>
            <i className="fi fi-rr-arrow-small-right relative bottom-[25px] left-[90%] text-2xl"></i>
          </p>
        </div>
        </Link>
    </div>
  );
};

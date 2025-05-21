import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Searchbox = () => {
  return (
  <div className="Seach">
     <input type="text" placeholder="search" />
    <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
);
};
export default Searchbox
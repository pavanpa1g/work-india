import React from 'react'
import { navLinksData } from '../../helper/data';
import { Link,useLocation } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { RxCross1 } from "react-icons/rx";

import "./index.css"
import { setSlider } from '../../store/features/searchSlice';

const Slider = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const handleLinkClick =()=>{
      dispatch(setSlider())
    }
  return (
    <div className="nav-links-bg-container-mb open">
      <button onClick={() => dispatch(setSlider())} className="cross">
        <RxCross1 color="#000" size={18} />
      </button>
      <div className="nav-links-container-mb">
        <div className="nav-links">
          {navLinksData.map((data) => (

              <Link
                to={data.link}
                className="nav-link-mobile"
                onClick={handleLinkClick}
                key={data.link}
              >
                <p
                  className={`nav-para ${
                    location.pathname === data.link ? "active" : ""
                  }`}
                >
                  {data.title}
                </p>
              </Link>

          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider
import { useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import "./featuredProperties.css";
import { AuthContext } from "../../../context/AuthContext";
const FeaturedProperties = () => {
  const baseURL = `${process.env.REACT_APP_BASE_URL}`
  
  const { data, loading, error } = useFetch(`${baseURL}/products`);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);


    const opts = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    opts.headers.Authorization = "Bearer " + currentUser.token;
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item.id}>
              <img
                src={process.env.REACT_APP_MEDIA_URL + "/" +item.featureImage.id}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.title}</span>
              <span className="fpCity">{item.description}</span>
              <span className="fpPrice">Starting from ${item.price}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;

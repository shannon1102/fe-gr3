/* eslint-disable jsx-a11y/anchor-is-valid */
import LightGallery from "lightgallery/react";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "./postMedia.css";
export default function PostMedia({ mediaMaps }) {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <div className="App">
      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        iframeMaxWidth="700px"
      >
        {mediaMaps &&
          mediaMaps.map((mediaMap) => {
            let imageUrl =
              "http://localhost:4000/static/" + mediaMap.media.link;
            return (
              <a
                key={mediaMap.media.id}
                //   data-lg-size={ '1280-720'}
                className="gallery-item"
                data-src={imageUrl}
              >
                <img
                  style={{
                    maxWidth: (mediaMaps.length % 2 == 0) ? "300px" : (mediaMaps.length % 3 == 0)  ? "200px": "600px" ,
                    // width: "auto",
                    height: "auto",
                    flexShrink: 0,
                    minHeight: "30%",
                    minWidth: "30%",
                  }}
                  className="img-responsive"
                  alt="img1"
                  src={imageUrl}
                />
              </a>
            );
          })}
      </LightGallery>
    </div>
  );
}

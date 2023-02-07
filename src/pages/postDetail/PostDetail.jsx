import React from "react";
import { Slide, Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Topbar from "../../components/topbar/Topbar";
import "./postDetail.css";

export default function PostDetail({images}) {

  const BEStaticFileBaseURL = process.env.NODEJS_BE_FILE_FOLDER
  // const fadeImages = [
  //   {
  //     id: "62e2a9a0181a950016d1d153",
  //     url: "https://firebasestorage.googleapis.com/v0/b/fir-store-files.appspot.com/o/Screenshot from 2022-07-02 17-15-36-1659021728708.png?alt=media",
  //   },
  //   {
  //     id: "62e2a9a0181a950016d1d154",
  //     url: "https://firebasestorage.googleapis.com/v0/b/fir-store-files.appspot.com/o/Screenshot from 2022-07-02 17-15-29-1659021728726.png?alt=media",
  //   },
  //   {
  //     id: "62e2a9a0181a950016d1d155",
  //     url: "https://firebasestorage.googleapis.com/v0/b/fir-store-files.appspot.com/o/Screenshot from 2022-07-02 17-15-26-1659021728747.png?alt=media",
  //   },
  // ];
  return (
    <>
    {/* <Topbar /> */}
    <div
      className="slide-container"
      style={{
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        // marginBottom:"auto",
        // marginTop:"auto",
        width: "700px",
      }}
    >
      <Fade>
        {images.map((fadeImage, index) =>
        {
          let imageUrl= "http://localhost:4000/static/" + fadeImage.media.link;
          console.log("IMG LINK",imageUrl)
        return (
          <div className="each-fade" key={index}
          
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            // marginBottom:"auto",
            marginTop:"20px",
            width: "750px",
            maxHeight:"500px",
            maxWidth:"750px"
          }}>
            <div className="image-container" width={"600px"} >
              <img src={imageUrl} alt="postimage" width={"100%"} height={"auto"}/>
            </div>
            <h2>{fadeImage?.caption}</h2>
          </div>
        )
}
        )}


      </Fade>
    </div>
    </>
  );
}

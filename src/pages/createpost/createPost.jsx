import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddressSelect from '../../components/post/adressSelect/AddressSelect'
import MetaDataForm from '../../components/post/metaDataForm/MetaDataForm'
import './createPost.css'
import { useContext, useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import TopSlideshow from "../../components/topSlideShow/TopSlideshow"
// import Sidebar from "../../components/sidebar/Sidebar"
import { Cancel, CloseRounded, CloudUpload, AddAPhoto,VideoCall } from "@material-ui/icons";
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Wrapper } from "@googlemaps/react-wrapper";
import MyMapComponent from '../../components/myMapComponent/MyMapComponent'

export default function CreatePost({user}) {
  const [fileAvatar, setFileAvatar] = useState(null);
  return ( 
  <div className="createPost">
        <h1 className="createPost__title">
          Đăng tin mới
        </h1>
        <div className="createPost__address">
            <h2 className="addressSelect__title">
              Địa chỉ cho thuê
            </h2>
            <div className="addressSelect__container">
            <AddressSelect></AddressSelect>
            <div className="map__container">
            {/* <Wrapper apiKey={"AIzaSyAWoHZCpC0OPdn-H4veaUZFWvUTFL18Izc"}>
                <MyMapComponent />
            </Wrapper> */}
              <iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=588&amp;height=400&amp;hl=en&amp;q=Hà Nội&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            </div>
        </div>
        </div>
        <div className="createPost__metaData">
        <h2 className="metaData__title">
          Thông tin mô tả
        </h2>
        <MetaDataForm></MetaDataForm>
        </div>
        <div className="createPost__uploadImg">
        <h2 className="uploadImg__title">
          Thông tin mô tả
        </h2>
        <p>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</p>
        <div className="uploadImg__container">
        <label for="avatar-upload" className="uploadLabel">
                <AddAPhoto htmlColor="tomato" className="uploadImg__icon" /><span><h3> Avatar picture</h3></span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  multiple="multiple"
                  id="avatar-upload"
                  accept=".png,.jpeg,.jpg,.mp4"
                  onChange={(e) => setFileAvatar(e.target.files[0])}
                />
        </label>
        </div>
        </div>
        <div className="createPost__uploadFile">
        <h2 className="uploadImg__title">
        Video
        </h2>
        <p>Upload video từ máy của bạn</p>
        <div className="uploadImg__container">
        <label for="avatar-upload" className="uploadLabel">
                <VideoCall htmlColor="tomato" className="uploadImg__icon" /><span><h3> Avatar picture</h3></span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  multiple="multiple"
                  id="avatar-upload"
                  accept=".png,.jpeg,.jpg,.mp4"
                  onChange={(e) => setFileAvatar(e.target.files[0])}
                />
              </label>
        </div>     
        </div>

      <div className="submitBtnContainer">
      <Button variant="contained" style={{
        color: "#656565",
        backgroundColor: "#000000"
      }}>Contained</Button>

      </div>

    
    </div>

    // </div>
 
    // </>
   
  )
}

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from 'react-avatar';
import {storage, axios} from '../../../../utils';

function Settings({ user }) {
  const hiddenFileInput = React.useRef(null);
  const [newProfileImage, setnewProfileImage] = useState('');
  const [fileUploading, setfileUploading] = useState(false);
  const [infoUpdate, setInfoUpdate] = useState(false);
    const { handleSubmit, register } = useForm();



    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      const ext = file.type.split('/')[1];
      console.log(file);
    const task = storage.ref(`profile_pictures/${user.id}.${ext}`).put(file);

    task.on(
      "state_changed",
      (snapshot) => {setfileUploading(true)},
      (err) => console.log(err),
      () =>
        storage
          .ref(`profile_pictures`)
          .child(`${user.id}.${ext}`).getDownloadURL().then(url => {
            setnewProfileImage(url);
            console.log(url)
            setfileUploading(false)
          })
    );
    }
    const handleInfoUpdate = (values) => {
      setInfoUpdate(true);
      axios.post("/users/updateInfo", {
        id: user.id,
        profilePicture: newProfileImage !== '' ? newProfileImage: user.profilePicture ,
        phone: !values.phone ? user.phone : values.phone,
        name: values.name ? values.name : user.fullname,
        address: values.address ? values.address : user.address,
        email: user.email
      }).then(d => {
        console.log(d.data)
        setInfoUpdate(false);
      }).catch(e => console.log(e));
 }  
 return (
   <div className="settings-container">
   
     <div className="profile-picture-container" >
       {fileUploading ? (
         <div className="loader"></div>
       ) : (
         <>
           <Avatar
               size={250}
             onClick={(e) => hiddenFileInput.current.click()}
             className="profile-picture"
             name={user.fullname}
             round
             src={
               newProfileImage !== "" ? newProfileImage : user.profilePicture
             }
           />
           <input
             className="file-input"
             ref={hiddenFileInput}
             onChange={(e) => handleFileUpload(e)}
             type="file"
             accept=".jpeg, .jpg, .png"
           />
         </>
       )}
     </div>
     <form onSubmit={handleSubmit(handleInfoUpdate)}>
     <div className="settings-form-container">


           <input

               className="brand-input mt-3"
               placeholder="Email"
               {...register("email")}
               disabled
               defaultValue={user.email}
           />


           <input
               className="brand-input"
               placeholder="Name"
               {...register("name")}
               defaultValue={user.fullname}
           />


           <input
               className="brand-input"
               placeholder="Address"
               {...register("address")}
               defaultValue={user.address}
           />


           <input
               className=" brand-input"
               placeholder="Phone"
               {...register("phone")}
               defaultValue={user.phone}
           />


           <button type="submit" className="brand-btn" >
             {infoUpdate ? "Updaing.." : "Update Info"}
           </button>


     </div>
     </form>
   </div>
 );
}

export default Settings;

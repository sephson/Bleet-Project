import React, { useState } from "react";
import axios from "axios";

export default function Upload({ userId }) {
const [fileInputState, setFileInputState] = useState("")
const [previewSource, setPreviewSource] = useState()
const [selectedFile, setSelectedFile] = useState('')
const [url, setUrl] = useState("")
const [bio, setBio] = useState("")
const handleInputChange = e => {
  const file = e.target.files[0]
  previewFile(file)
          setSelectedFile(file);
        setFileInputState(e.target.value);

}

const previewFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    setPreviewSource(reader.result)
  }
}

const handleSubmitFile =(e) => {
  e.preventDefault();
//   if(!previewSource) return ;
//   uploadImage(previewSource);

  if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };

        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        
        };

}

const uploadImage = async (base64EncodedImage) => {
        const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  try{
         const {data} = await axios.put("/api/upload", JSON.stringify({data: base64EncodedImage}),
        config )

        setUrl(data)


     
  

  }
  catch(err){
    console.log(err)
  }
}

const profileUpdate = async() => {
  try{
   await axios.put(`/api/user/${userId}/update`, {
        profilePicture: url?.uploadResponse?.url,
        bio,
      })}

      catch(e){
console.log(e)
      }
}
console.log(url)
console.log(url?.uploadResponse?.url)

  return (
    <div>
     <form onSubmit={handleSubmitFile}>
       {previewSource && (
       <img src={previewSource} alt="choosen" style={{height: '100px', width:"50%"}} />
     )}
     <input type="file" name="image" onChange={handleInputChange} value={fileInputState} className="form-input"/>
     <input placeholder="Bio"  onChange={(e)=>setBio(e.target.value)}/>
     <button className="btn" type="submit">Submit</button>
        <button className="btn" onClick={profileUpdate}>Update profile</button>
     </form>
   
    </div>
  );
}

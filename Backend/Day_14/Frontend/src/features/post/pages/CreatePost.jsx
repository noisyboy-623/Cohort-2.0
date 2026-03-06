import React, { useState, useRef } from "react";
import "../style/createPost.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);

  const {loading, handleCreatePost} = usePost()
  const navigate = useNavigate()

  if(loading){
    <main><h1>Creating Posts...</h1></main>
  }
  async function handleSubmit (e){
    e.preventDefault()

    const file = postImageInputFieldRef.current.files[0]
    await handleCreatePost(file, caption)
    navigate('/')
  }
  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label
            
            className="post-image-label"
            htmlFor="postImage"
          >
            Select image
          </label>
          <input ref={postImageInputFieldRef} hidden type="file" name="postImage" id="postImage" />
          <input
          value={caption}
          onInput={(e) => {setCaption(e.target.value)}}
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter caption"
          />
          <button className="button primary-button">Create post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;

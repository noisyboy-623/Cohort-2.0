/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import {
  createPost,
  getFeed,
  likePost,
  unlikePost,
} from "../services/post.api";

export function usePost() {
  const context = useContext(PostContext);
  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts.reverse());
    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    const data = await createPost(imageFile, caption);
    setFeed([data.posts, ...feed]);
    setLoading(false);
  };

  const handleLike = async (post) => {
    const data = await likePost(post);
     await handleGetFeed()
  };

  const handleUnlike = async (post) => {
    const data = await unlikePost(post);
     await handleGetFeed()
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    post,
    feed,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleUnlike,
  };
}

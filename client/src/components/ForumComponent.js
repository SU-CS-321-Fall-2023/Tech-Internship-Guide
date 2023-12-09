import React, { useEffect, useState } from "react";
import ThreadPost from "./ThreadPost";
import CommentPostBox from "./CommentPostBox";
import { useFetch } from "../hooks/useFetch";

const ForumComponent = () => {
  const [posts, setPosts] = useState([]);
  const {data, refetch} = useFetch("posts");

  useEffect(() => {
    setPosts(data);
  }, [data]); 

  const updatePosts = async () => {
   refetch();
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:4000/post/${postId}/likes`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (response.ok) {
      
        refetch();
      } else {
        console.error(`Failed to like post with ID: ${postId}`);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div>
      <div>
        <CommentPostBox styling="m-3" placeholder="Make a post" title="Post" updatePosts={updatePosts} />
        <div>
          {posts?.map(({ _id, content, likes, replies, user, image }) => (
            <ThreadPost key={_id} postId = {_id} text={content} likes={likes} comments={replies} name={user?.firstName || "Unknown User"} image={image} onLike = {handleLike} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumComponent;

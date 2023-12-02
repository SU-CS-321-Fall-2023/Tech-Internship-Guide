import React from "react";
import PostTextBox from "./CommentPostBox";
import ThreadPost from "./ThreadPost";

//This is just a dummy data for the forum

// We will pull the data from the database and display it here

const posts = [
  {
    id: 1,
    text: "This is the first post",
    likes: 10,
    comments: 5,
    image: "https://picsum.photos/200",
    name: "John Doe",
  },
  {
    id: 2,
    text: "This is the second post",
    likes: 20,
    comments: 10,
    image: "https://picsum.photos/200",
    name: "Jane Doe",
  },
  {
    id: 3,
    text: "This is the third post",
    likes: 30,
    comments: 15,
    image: "https://picsum.photos/200",
    name: "John Brown",
  },
];

const ForumComponent = () => {
  return (
    <div >
      <div>
        <PostTextBox
          styling="m-3"
          placeholder="Make a post"
          title="Post"
        />
        <div>
          {posts.map(({ id, text, likes, comments, name, image}) => (
            <ThreadPost key={id} text={text} likes={likes} comments={comments} name= {name} image={image}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumComponent;

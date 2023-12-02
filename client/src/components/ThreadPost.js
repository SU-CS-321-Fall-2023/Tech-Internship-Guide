// ThreadPostWithComments.js

import React, { useState } from "react";
import { Card, Image, Button } from "react-bootstrap";
import PostTextBox from "./CommentPostBox";

function CardContent({
  text,
  likes,
  comments,
  onToggleComments,
  onToggleReplies,
  onLike,
  startReply,
  isReply,
  name,
  image
}) {

  const cardStyle = isReply ? { marginLeft: "50px" } : {};
  return (
    <div style={cardStyle}>
      <Card.Header className="d-flex align-items-center">
        <Image
          src= {image}
          roundedCircle
          width="40"
          height="40"
          className="me-2"
        />
        <Card.Title className="d-inline me-2">{name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text className="text-start">{text}</Card.Text>
        <div className="d-flex mb-2">
          <div className="me-2">{likes} Likes</div>
          <div className="ms-auto">{comments} Comments</div>
        </div>

        {/* Buttons moved here */}

        <div className="d-flex">
          <Button
          variant="outline-primary"
          size="sm"
          className="me-2"
          onClick={isReply ? onToggleReplies : onToggleComments}
        >
          {isReply ? "Reply" : "Comment"}
        </Button>
          <Button
            variant="outline-primary"
            size="sm"
            className="ms-2"
            onClick={onLike}
          >
            Like
          </Button>
        </div>
        {startReply && (
          <PostTextBox
            styling="mx-auto mt-3 mb-3"
            placeholder="Reply to this post..."
            title="Reply"
          />
        )}
      </Card.Body>
    </div>
  );
}

function ThreadPost(props) {
    const [showComments, setShowComments] = useState(false);
    const [likes, setLikes] = useState(0);
    const [showReplies, setShowReplies] = useState(false);



  const replies = [
    {
      text: "Secrecy is so detrimental to the AI field and to the world right now. It fuels misinformation, sends tons of researchers and ressources to the wrong directions and leads to dangerous mistakes like bad regulation because of public opinion fears. I wish leaders of the field would take this issue more seriously and foster more transparency and openness",
      likes: 0,
      comments: 0,
    },
    {
      text: "As a community, RTC has always been dedicated to inclusivity and support for all of our members. This year, we took a significant step forward in achieving that goal by launching Tech Natives, our third Affinity Group, to cater to Native ",
      likes: 0,
      comments: 0,
    },
    {
      text: "I'm seeing a huge up tick in companies posting recruiting jobs just this week which makes me happy to see! Below are jobs to check out across the US. ",
      likes: 0,
      comments: 0,
    },
  ];
  const [startReplies, setStartReplies] = useState(Array(replies.length).fill(false));
  const handleToggleComments = () => {
    setShowComments(!showComments);
    setShowReplies(!showReplies);
  };
  const handleToggleReplies = (index) => {
    const newStartReplies = [...startReplies];
    newStartReplies[index] = !newStartReplies[index];
    setStartReplies(newStartReplies);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <Card
      className="mb-3 text-white"
      style={{ backgroundColor: "black", maxWidth: "850px" }}
    >
      <CardContent
        text={props.text}
        likes={props.likes}
        comments={props.comments}
        onToggleComments={handleToggleComments}
        onLike={handleLike}
        name={props.name}
        image={props.image}
      />

      {showComments && (
        <div>
          <PostTextBox
            styling="mx-auto mt-3 mb-3"
            placeholder="Reply to this post..."
            title="Reply"
          />
        </div>
      )}

      {showReplies && (
        <div>
          {replies.map(({ text, likes, comments }, index) => (
            <CardContent
              key={index}
              text={text}
              likes={likes}
              comments={comments}
              onToggleReplies={() => handleToggleReplies(index)}  // Pass index to handleToggleReplies
              isReply={true}
              startReply={startReplies[index]}  // Use startReply for the specific card
            />
          ))}
        </div>
      )}
    </Card>
  );
}

export default ThreadPost;
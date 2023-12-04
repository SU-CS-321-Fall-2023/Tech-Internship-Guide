import React, { useState } from "react";
import { Card, Image, Button } from "react-bootstrap";
import CommentPostBox from "./CommentPostBox";

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
  image,
  postId
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
          <CommentPostBox
            styling="mx-auto mt-3 mb-3"
            placeholder="Reply to this post..."
            title="Reply"
            postId={postId}

          />
        )}
      </Card.Body>
    </div>
  );
}

function ThreadPost(props) {
    const [showComments, setShowComments] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    console.log(props, "ThreadPost props");
  const [startReplies, setStartReplies] = useState(Array(props.comments?.length).fill(false));
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
    props.onLike(props.postId);
  };

  return (
    <Card
      className="mb-3 text-white"
      style={{ backgroundColor: "black", maxWidth: "850px" }}
    >
      <CardContent
        text={props.text}
        likes={props.likes?.length}
        onToggleComments={handleToggleComments}
        onLike={handleLike}
        name={props.name}
        image={props.image}
        postId={props.postId}

      />

      {showComments && (
        <div>
          <CommentPostBox
            styling="mx-auto mt-3 mb-3"
            placeholder="Reply to this post..."
            title="Reply"
            postId={props.postId}
            
          />
        </div>
      )}

      {showReplies && (
        <div>
          {props?.comments?.map(({ content, likes, comments, userId }, index) => (
            <CardContent
              key={index}
              name= {userId?.firstName || "Unknown User"}
              text={content}
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
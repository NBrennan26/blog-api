function CommentTile({ comment }) {
  return (
    <>
      <div>CommentTile</div>
      <section>
        <p>{comment.user.username}</p>
        <p>{comment.text}</p>
        <p>{new Date(comment.updatedAt).toLocaleString("en-US")}</p>
      </section>
    </>
  );
}

export default CommentTile;

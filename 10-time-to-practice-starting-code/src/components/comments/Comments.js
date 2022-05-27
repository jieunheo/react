import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import classes from './Comments.module.css';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { quoteId } = useParams();

  const { sendRequest, status, data: loadedComments, error } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    // comment 입력 시 자동으로 다시 불러오기
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;

  if(status === 'pending') { // 로딩중
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if(error) {
    comments = <div className='centered'>Error!!</div>;
  }

  // 값이 정상적으로 들어온 경우
  if(status === 'completed' && (loadedComments && loadedComments.length > 0) && !error) {
    comments = <CommentsList comments={loadedComments} />;
  }

  // 값이 없거나 비어있는 경우
  if(status === 'completed' && (!loadedComments || loadedComments.length === 0) && !error) {
    comments = <div className='centered'>No comments were added yet!</div>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;

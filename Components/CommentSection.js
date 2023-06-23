import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { getTimeAgo } from "../utils/functions";
import {motion } from "framer-motion";

const CommentSection = ({ comments }) => {
  const [expandedComments, setExpandedComments] = useState([]);
  const [allCommentsExpanded, setAllCommentsExpanded] = useState(false);

  const toggleComment = (commentId) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter((id) => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };

  const toggleAllComments = () => {
    if (allCommentsExpanded) {
      setExpandedComments([]);
    } else {
      const allCommentIds = getAllCommentIds(comments);
      setExpandedComments(allCommentIds);
    }
    setAllCommentsExpanded(!allCommentsExpanded);
  };

  useEffect(() => {
    if (allCommentsExpanded) {
      const allCommentIds = getAllCommentIds(comments);
      setExpandedComments(allCommentIds);
    }
  }, [comments, allCommentsExpanded]);

  const getAllCommentIds = (comments) => {
    let ids = [];
    comments.forEach((comment) => {
      ids.push(comment.id);
      if (comment.comments && comment.comments.length > 0) {
        ids = [...ids, ...getAllCommentIds(comment.comments)];
      }
    });
    return ids;
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div className="comment" key={comment?.id}>
        <div className="commentContent">
            <div className="flex items-center">
                <div>
                    <Image
                        src = "https://avatar.vercel.sh/ldhgrh"
                        alt = "avatar"
                        width = {30}
                        height = {30}
                        className = "rounded-full mr-2"
                    />
                </div>
                <div>
                    <p className="font-bold">{comment?.by}</p>
                </div>
                <div>
                    {(comment?.comments && comment?.comments?.length > 0 && 
                        <button
                            className="flex justify-center items-center border-2 border-gray-500 rounded-2xl px-1 ml-1"
                            onClick={() => toggleComment(comment?.id)}
                            >
                            {expandedComments.includes(comment?.id) ? <AiOutlineMinusCircle color="black"/> : <AiOutlinePlusCircle color="black"/>}{" "}
                            {expandedComments.includes(comment?.id)
                                ? <div className="flex text-sm mx-1">
                                    {" "}Hide{" "}
                                </div>
                                : 
                                <div className="flex text-sm mx-1">
                                    {" "+comment.comments.length+ " "}
                                    more comments
                                </div> 
                            }
                        </button>
                    )}
                </div>
                <div>
                    <p className="text-gray-500 ml-2 text-sm">{getTimeAgo(comment?.time)}</p>
                </div>
            </div>
          <div dangerouslySetInnerHTML={{ __html : comment?.text}}></div>
        </div>
        {comment?.comments && comment?.comments?.length > 0 && (
          <div className="subComments">
            {expandedComments.includes(comment?.id) && 
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                {renderComments(comment?.comments)}
              </motion.div>
            }
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="mt-4 w-[300px] sm:w-[800px]">
        <button
            className="flex justify-center items-center border-2 border-gray-500 rounded-2xl px-1 ml-1"
            onClick={() => toggleAllComments()}
            >
            {allCommentsExpanded ? <AiOutlineMinusCircle color="black"/> : <AiOutlinePlusCircle color="black"/>}{" "}
            {allCommentsExpanded
                ? <div className="flex mx-1">    
                    Collapse all
                  </div>
                :
                  <div className="flex mx-1">
                      Expand all
                  </div>
            }
        </button>
        <div className="commentSection border-l-2 border-black  w-[300px] sm:w-[800px] rounded-lg px-[10px] mb-10">
            {renderComments(comments)}
        </div>
    </div>
  )
};

export default CommentSection;

import { NextResponse } from "next/server";

export async function GET(req,res) {
    const fetchStory = async (storyId) => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
        const story = await response.json();
        return story;
      };
      
      const fetchComments = async (commentIds) => {
        const commentPromises = commentIds.map(async (commentId) => {
          const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);
          const comment = await response.json();
          return comment;
        });
      
        const comments = await Promise.all(commentPromises);
        return comments;
      };
      
      const fetchSubcomments = async (comment) => {
        if (!comment.kids) {
          return [];
        }
      
        const subcommentIds = comment.kids;
        const comments = await fetchComments(subcommentIds);
      
        // Fetch comments recursively
        const subcommentPromises = comments.map(fetchSubcomments);
        const nestedSubcomments = await Promise.all(subcommentPromises);
      
        // Assign comments as property of the parent comment
        comments.forEach((subcomment, index) => {
          subcomment.comments = nestedSubcomments[index];
        });
      
        return comments;
      };
      
      const fetchStoryData = async (storyId) => {
        const story = await fetchStory(storyId);
        const commentIds = story.kids;
        const comments = await fetchComments(commentIds);
      
        const commentsWithSubcomments = [];
        for (const comment of comments) {
          const commentWithSubcomments = {
            ...comment,
            comments: await fetchSubcomments(comment)
          };
          commentsWithSubcomments.push(commentWithSubcomments);
        }
      
        const storyData = {
          story,
          comments: commentsWithSubcomments
        };
      
        return storyData;
      };
      const storyData = await fetchStoryData(36427849);

    return NextResponse.json(storyData);
      
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaReply } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im'; // Import spinner icon

const CommentSection = () => {
  const { ticketId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reply, setReply] = useState({});
  const [showReply, setShowReply] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userName, setUserName] = useState(''); // State for storing user name
  const [userInitials, setUserInitials] = useState(''); // State for storing user initials

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    // Fetch current user's details
    const fetchUserDetails = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await fetch(`${apiBaseUrl}/api/auth/authenticated-user`, options);
        const data = await response.json();
        const fullName = `${data.firstName || ""} ${data.lastName || ""}`;
        setUserName(fullName);
        setUserInitials(getInitials(fullName)); // Set user initials
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [apiBaseUrl, token]);

  // Function to generate initials
  const getInitials = (name) => {
    const initials = name.split(' ').map(n => n[0]).join('');
    return initials.toUpperCase();
  };

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setLoadingMore(true);
      try {
        const response = await axios.get(`${apiBaseUrl}/api/tickets/${ticketId}/comments?page=${page}&limit=5`, { // Limit to 5 comments per page
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(prevComments => [...prevComments, ...response.data.comments]);
        setHasMore(response.data.hasMore);
      } catch (err) {
        setError('Error fetching comments: ' + err.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchComments();
  }, [ticketId, page, apiBaseUrl, token]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleReplyChange = (e, commentId) => {
    setReply({
      ...reply,
      [commentId]: e.target.value,
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseUrl}/api/tickets/comment/${ticketId}`, { message: newComment }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewComment('');
      setPage(0);
      setComments([]);
    } catch (err) {
      setError('Error submitting comment: ' + err.message);
    }
  };

  const handleReplySubmit = async (commentId) => {
    try {
      const commenterName = comments.find(c => c.id === commentId)?.commenterName;
      await axios.post(`${apiBaseUrl}/api/tickets/comment/${ticketId}`, { 
        message: `<span class="text-blue-600">@${commenterName}</span>: ${reply[commentId]}`, // Styled @ symbol
        parentCommentId: commentId 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReply({ ...reply, [commentId]: '' });
      setShowReply({ ...showReply, [commentId]: false });
      setPage(0);
      setComments([]);
    } catch (err) {
      setError('Error submitting reply: ' + err.message);
    }
  };
  
  const toggleReply = (commentId) => {
    setShowReply(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const loadMoreComments = () => {
    if (hasMore && !loadingMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const goBackToPreviousComments = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

  if (loading) return <div className="text-center"><ImSpinner8 className="animate-spin text-2xl" /></div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <section className="p-4 rounded-lg">
      <div className="text-lg font-normal mb-4"> Comments</div>

      <div className="space-y-4 mb-4">
        {comments.map((comment) => (
          <div key={`comment-${comment.id}`} className="p-4 bg-white border-b border-gray-300">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full">
                {getInitials(comment.commenterName)} {/* Show initials */}
              </div>
              <div className="ml-3 flex-grow">
                <div className="flex justify-between">
                  <div>
                    <strong>{comment.commenterName}</strong>
                    <span className="text-blue-500 text-sm"> {new Date(comment.sentAt).toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => toggleReply(comment.id)} 
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <FaReply />
                  </button>
                </div>
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: comment.message }}></div>
              </div>
            </div>
            {/* Display Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-2 pl-14 border-l border-gray-300">
                {comment.replies.map((reply) => (
                  <div key={`reply-${reply.id}`} className="pl-4 mt-2 border-b border-gray-200 flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-white rounded-full">
                      {getInitials(reply.replierName)} {/* Show initials */}
                    </div>
                    <div className="ml-3 flex-grow">
                      <div>
                        <strong>{reply.replierName}</strong>
                        <span className="text-blue-500 text-sm"> {new Date(reply.sentAt).toLocaleString()}</span>
                      </div>
                      <div className="mt-1" dangerouslySetInnerHTML={{ __html: reply.message }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Reply Section */}
            {showReply[comment.id] && (
              <div className="mt-2 pl-14 border-t border-gray-300 pt-2 flex items-start">
                <textarea
                  value={reply[comment.id] || ''}
                  onChange={(e) => handleReplyChange(e, comment.id)}
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                  placeholder={`Replying to ${comment.commenterName}...`}
                />
                <button
                  onClick={() => handleReplySubmit(comment.id)}
                  className="w-20 ml-2 px-2 py-1 bg-blue-600 text-white rounded-lg"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        {page > 0 && (
          <button
            onClick={goBackToPreviousComments}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Previous Comments'}
          </button>
        )}

        {hasMore && (
          <button
            onClick={loadMoreComments}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More Comments'}
          </button>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-2 pl-4 border-t border-gray-300 pt-2 flex items-start">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          rows="2"
          className="w-full p-2 border border-gray-300 rounded-lg resize-none"
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="w-20 ml-2 px-2 py-1 bg-blue-600 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </section>
  );
};

export default CommentSection;

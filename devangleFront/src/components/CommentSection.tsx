import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MessageCircle, 
  Send, 
  Heart, 
  Reply, 
  Clock
} from "lucide-react";
import { useAuth } from "@/context/useAuth";

interface Comment {
  id: number;
  content: string;
  author: string;
  authorEmail: string;
  authorAvatar?: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments(prev => [newCommentData, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/comments/${commentId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setComments(prev => prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, likesCount: comment.isLiked ? comment.likesCount - 1 : comment.likesCount + 1, isLiked: !comment.isLiked }
            : comment
        ));
      }
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const getAvatarFallback = (name: string, email: string) => {
    if (name) return name.slice(0, 2).toUpperCase();
    if (email) return email.slice(0, 2).toUpperCase();
    return "U";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Comments</h3>
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Comments ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] resize-none border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500 focus:ring-gray-400 dark:focus:ring-gray-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || submitting}
                  className="bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Posting...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Post Comment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Comments List */}
      <AnimatePresence>
        {comments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No comments yet. Be the first to share your thoughts!</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                    {getAvatarFallback(comment.author, comment.authorEmail)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {comment.author}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeComment(comment.id)}
                      className={`h-8 px-3 text-sm ${
                        comment.isLiked 
                          ? "text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" 
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }`}
                    >
                      <Heart className={`mr-1 h-3 w-3 ${comment.isLiked ? "fill-current" : ""}`} />
                      {comment.likesCount}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <Reply className="mr-1 h-3 w-3" />
                      Reply
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 
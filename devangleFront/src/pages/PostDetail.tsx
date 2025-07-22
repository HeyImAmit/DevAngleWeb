import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Clock,
  Tag,
  Calendar,
  Sparkles,
  TrendingUp,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/useAuth";
import type { Post } from "@/types/Post";
import CommentSection from "@/components/CommentSection";
import { toast } from "react-hot-toast";

interface PostDetail extends Post {
  content: string;
  createdAt: string;
  authorAvatar?: string;
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    if (!id) return;
    
    async function fetchPost() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log("Fetching post with token:", token ? "present" : "missing");
        
        const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Post response status:", response.status);
        console.log("Post response headers:", response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Post error response:", errorText);
          throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Post data:", data);
        setPost(data);
        setIsLiked(!!data.likedByCurrentUser);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!post || !user) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/posts/${post.id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success(isLiked ? "Like removed" : "Post liked!");
        // Refetch post to get updated like state
        const updated = await fetch(`${BASE_URL}/api/posts/${post.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (updated.ok) {
          const data = await updated.json();
          setPost(data);
          setIsLiked(!!data.likedByCurrentUser);
        }
      } else {
        toast.error("Failed to like post");
      }
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-4 rounded-xl" />
          <Skeleton className="h-6 w-1/2 mb-8 rounded-xl" />
          <Skeleton className="h-96 w-full mb-8 rounded-3xl" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-100 dark:border-gray-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Post Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/dashboard")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // For scroll-to-comments UX
  const scrollToComments = () => {
    const el = document.getElementById("comments-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 flex flex-col items-center py-12 px-2">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-3xl mb-8"
      >
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur rounded-full px-4 text-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-4"
        >
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-200 border-0 shadow-none rounded-full px-3 py-0.5 text-xs">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent leading-tight max-w-3xl mx-auto">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center justify-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-gray-900 shadow-lg">
              <AvatarImage src={post.authorAvatar} alt={post.author} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold text-base">
                {post.author?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-white text-base">{post.author}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTimeAgo(post.createdAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span>{Math.floor(post.likesCount * 2.5 + post.commentsCount * 1.5)} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{post.likesCount} likes</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.commentsCount} comments</span>
            </div>
          </div>
          {/* Delete Button (only for author) */}
          {user?.email === post.authorEmail && (
            <div className="flex justify-center mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-white hover:bg-red-500 border border-red-200 dark:border-red-700 rounded-full px-4 py-1 text-xs flex items-center gap-2 transition-colors duration-200"
                onClick={async () => {
                  if (window.confirm("Are you sure you want to delete this post?")) {
                    const token = localStorage.getItem("token");
                    const res = await fetch(`${BASE_URL}/api/posts/${post.id}`, {
                      method: "DELETE",
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    if (res.ok) {
                      toast.success("Post deleted");
                      navigate("/dashboard");
                    } else {
                      toast.error("Failed to delete post");
                    }
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Delete
              </Button>
            </div>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="prose prose-base max-w-none text-gray-800 dark:text-gray-100 leading-relaxed bg-transparent p-0 mt-10 mx-auto"
        >
          <div className="text-base leading-7 space-y-4">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Floating Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="fixed left-1/2 -translate-x-1/2 bottom-10 z-40 flex items-center gap-6 px-6 py-3 rounded-full bg-white/80 dark:bg-gray-900/80 shadow-2xl border border-gray-100 dark:border-gray-800 backdrop-blur-xl"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
        >
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 text-base"
          >
            <div className="relative">
              <Heart 
                className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-gray-200'}`} 
              />
              {isLiked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Heart className="h-6 w-6 fill-red-500 text-red-500" />
                </motion.div>
              )}
            </div>
            <span className="font-medium">{post.likesCount}</span>
          </motion.button>

          {/* Comment Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToComments}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-base"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="font-medium">{post.commentsCount}</span>
          </motion.button>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 text-base"
          >
            <Share2 className="h-6 w-6" />
            <span className="font-medium">Share</span>
          </motion.button>

          {/* Bookmark */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBookmark}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200 text-base"
          >
            <Bookmark 
              className={`h-6 w-6 ${isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-700 dark:text-gray-200'}`} 
            />
            <span className="font-medium">{isBookmarked ? 'Saved' : 'Save'}</span>
          </motion.button>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          id="comments-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <CommentSection postId={post.id} />
        </motion.div>

        {/* Related Posts Section - visually light, no boxy cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                More from {post.author}
              </h2>
              <Sparkles className="h-6 w-6 text-purple-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-base">Discover more amazing content from this author</p>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            {/* Featured Post */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-white/80 to-purple-50/60 dark:from-gray-900/80 dark:to-purple-900/60 rounded-2xl p-5 shadow-lg flex flex-col items-start max-w-xs min-w-[220px] border border-gray-100 dark:border-gray-800"
            >
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 mb-2 text-xs px-2 py-0.5">
                <Star className="mr-1 h-3 w-3" />
                Featured
              </Badge>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">The Future of Web Development</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                Exploring the latest trends and technologies that will shape the future of web development...
              </p>
              <Button variant="ghost" size="sm" className="text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 mt-auto text-xs px-2 py-0.5">
                Read More
              </Button>
            </motion.div>
            {/* Popular Post */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-white/80 to-orange-50/60 dark:from-gray-900/80 dark:to-orange-900/60 rounded-2xl p-5 shadow-lg flex flex-col items-start max-w-xs min-w-[220px] border border-gray-100 dark:border-gray-800"
            >
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mb-2 text-xs px-2 py-0.5">
                <TrendingUp className="mr-1 h-3 w-3" />
                Popular
              </Badge>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Mastering React Hooks</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                A comprehensive guide to understanding and implementing React Hooks effectively...
              </p>
              <Button variant="ghost" size="sm" className="text-orange-600 dark:text-orange-300 hover:text-orange-700 dark:hover:text-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/30 mt-auto text-xs px-2 py-0.5">
                Read More
              </Button>
            </motion.div>
            {/* Latest Post */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-white/80 to-green-50/60 dark:from-gray-900/80 dark:to-green-900/60 rounded-2xl p-5 shadow-lg flex flex-col items-start max-w-xs min-w-[220px] border border-gray-100 dark:border-gray-800"
            >
              <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 mb-2 text-xs px-2 py-0.5">
                <Clock className="mr-1 h-3 w-3" />
                Latest
              </Badge>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">Building Scalable APIs</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                Learn the best practices for designing and implementing scalable REST APIs...
              </p>
              <Button variant="ghost" size="sm" className="text-green-600 dark:text-green-300 hover:text-green-700 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/30 mt-auto text-xs px-2 py-0.5">
                Read More
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 
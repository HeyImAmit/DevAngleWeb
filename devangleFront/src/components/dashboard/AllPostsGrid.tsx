// components/dashboard/AllPostsGrid.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Heart, MessageCircle, Users } from "lucide-react";
import type { Post } from "@/types/Post";
import { Link } from "react-router-dom";

interface AllPostsGridProps {
  posts: Post[];
}

export default function AllPostsGrid({ posts }: AllPostsGridProps) {
  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <Users className="h-12 w-12 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No community posts yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          Be the first to share something with the community and inspire others to join the conversation!
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const truncateTitle = (title: string, maxLength: number = 60) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  const getAvatarFallback = (name: string, email: string) => {
    if (name) return name.slice(0, 2).toUpperCase();
    if (email) return email.slice(0, 2).toUpperCase();
    return 'U';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post) => (
        <motion.div
          key={post.id}
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="group bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden h-full">
            <Link to={`/post/${post.id}`} className="block h-full">
              <CardContent className="p-6 h-full flex flex-col">
                {/* Centered Header */}
                <div className="text-center mb-4">
                  <div className="flex justify-center mb-3">
                    <Avatar className="h-12 w-12 ring-2 ring-gray-200 dark:ring-gray-700">
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-800 text-white font-medium">
                        {getAvatarFallback(post.author, post.authorEmail)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {truncateTitle(post.title)}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Centered Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Centered Stats */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="font-medium">{post.likesCount}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{post.commentsCount}</span>
                  </div>
                </div>
                
                {/* Centered CTA */}
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20"
                  >
                    <span className="text-sm">Read more</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

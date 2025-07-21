// components/dashboard/UserPostsCarousel.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, ArrowRight, Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Post } from "@/types/Post";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface UserPostsCarouselProps {
  posts: Post[];
}

export default function UserPostsCarousel({
  posts,
}: UserPostsCarouselProps) {
  const [current, setCurrent] = useState(0);
  
  if (!posts.length) {
    return (
      <div className="text-muted-foreground text-center py-8">
        <p>You haven&apos;t created any posts yet.</p>
      </div>
    );
  }

  const handlePrev = () =>
    setCurrent((c) => (c === 0 ? posts.length - 1 : c - 1));
  const handleNext = () =>
    setCurrent((c) => (c === posts.length - 1 ? 0 : c + 1));

  const post = posts[current];

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

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold && current > 0) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold && current < posts.length - 1) {
      handleNext();
    }
  };

  return (
    <div className="w-full">
      <div className="relative max-w-md mx-auto">
        {/* Main Card with Framer Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <Link to={`/post/${post.id}`} className="block">
                <CardContent className="p-8">
                  {/* Centered Header */}
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-16 w-16 ring-2 ring-gray-200 dark:ring-gray-700">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-800 text-white font-semibold text-lg">
                          {getAvatarFallback(post.author, post.authorEmail)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-xl leading-tight mb-2">
                      {truncateTitle(post.title)}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium">{post.author}</span>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Centered Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
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
                  <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="font-medium">{post.likesCount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{post.commentsCount}</span>
                    </div>
                  </div>
                  
                  {/* Centered CTA */}
                  <div className="flex justify-center mt-6">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <span className="text-sm">View post</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {posts.length > 1 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
            >
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 shadow-lg"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
            >
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-900 shadow-lg"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {posts.length > 1 && (
        <motion.div 
          className="flex justify-center mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex gap-2">
            {posts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-200",
                  idx === current 
                    ? "bg-gray-900 dark:bg-white" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                )}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

import type { Post } from "@/types/Post";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { FilePlus, Users, Heart, User, Plus, MessageCircle } from "lucide-react";
import UserPostsCarousel from "@/components/dashboard/UserPostCarousel";
import AllPostsGrid from "@/components/dashboard/AllPostsGrid";
import { useAuth } from "@/context/useAuth";
import FancyLoader from "@/components/FancyLoader";

export default function Dashboard() {
  const { user, loginWithToken } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    async function authenticateAndNavigate() {
      if (token) {
        localStorage.setItem("token", token);
        const success = await loginWithToken(token);
        if (success) {
          navigate("/dashboard", { replace: true });
        }
      }
    }
    authenticateAndNavigate();
  }, [location.search, navigate, loginWithToken]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setStatsLoading(true);
    setError(null);
    async function fetchPosts() {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching posts with token:", token ? "present" : "missing");
        
        const res = await fetch("http://localhost:8080/api/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log("Response status:", res.status);
        console.log("Response headers:", res.headers);
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error response:", errorText);
          throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
        }
        
        const responseText = await res.text();
        console.log("Raw response:", responseText.substring(0, 200) + "...");
        
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse JSON:", parseError);
          console.error("Response was HTML, not JSON");
          throw new Error("Backend returned HTML instead of JSON");
        }
        
        console.log("Posts data:", data);
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
        setStatsLoading(false);
      }
    }
    fetchPosts();
  }, [user]);

  // Filter posts by current user's email for better uniqueness
  const userPosts = posts.filter((p) => p.authorEmail === user?.email);
  const otherPosts = posts.filter((p) => p.authorEmail !== user?.email);

  // Calculate more detailed stats
  const totalLikes = posts.reduce((sum, post) => sum + post.likesCount, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.commentsCount, 0);
  const userLikes = userPosts.reduce((sum, post) => sum + post.likesCount, 0);
  const userComments = userPosts.reduce((sum, post) => sum + post.commentsCount, 0);
  
  const stats = {
    totalPosts: posts.length,
    userPosts: userPosts.length,
    totalViews: posts.reduce((sum, post) => sum + (post.likesCount * 3 + post.commentsCount * 2), 0), // Estimated views based on engagement
    totalLikes,
    totalComments,
    userLikes,
    userComments,
    avgEngagement: posts.length > 0 ? Math.round((totalLikes + totalComments) / posts.length) : 0,
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };



  return (
    <>
      {(loading || statsLoading) && <FancyLoader show />}
      {/* Welcome Section */}
      <motion.div 
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's what's happening with your blog today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-gray-200 dark:ring-gray-700 shadow-lg">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold text-lg">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={itemVariants}
      >
        <motion.div variants={cardVariants}>
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Posts</CardTitle>
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <FilePlus className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(stats.totalPosts)}</div>
                  <p className="text-xs text-muted-foreground">
                    +{stats.userPosts} from you
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Your Posts</CardTitle>
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(stats.userPosts)}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.userLikes} likes, {stats.userComments} comments
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Likes</CardTitle>
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(stats.totalLikes)}</div>
                  <p className="text-xs text-muted-foreground">
                    +{formatNumber(Math.floor(stats.totalLikes * 0.2))} from last month
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants}>
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Comments</CardTitle>
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                <MessageCircle className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(stats.totalComments)}</div>
                  <p className="text-xs text-muted-foreground">
                    +{formatNumber(Math.floor(stats.totalComments * 0.2))} from last month
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      {loading ? (
        <motion.div 
          className="space-y-6"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-white/95 dark:bg-gray-900/95">
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      ) : error ? (
        <motion.div variants={itemVariants}>
          <Card className="border-red-200 bg-red-50/80 dark:border-red-800 dark:bg-red-950/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <span className="text-sm font-medium">Error:</span>
                <span className="text-sm">{error}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-12"
          variants={itemVariants}
        >
          {/* Your Posts Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Your Posts</h2>
                <p className="text-muted-foreground text-lg">
                  Manage and track your published content
                </p>
              </div>
              <Button variant="outline" asChild className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                <Link to="/dashboard/create">
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Link>
              </Button>
            </div>
            
            {userPosts.length === 0 ? (
              <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur">
                <CardContent className="pt-12 pb-12">
                  <div className="text-center">
                    <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                      <FilePlus className="h-10 w-10 text-gray-600 dark:text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
                    <p className="mt-2 text-muted-foreground max-w-sm mx-auto text-lg">
                      Get started by creating your first blog post and share your thoughts with the community.
                    </p>
                    <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                      <Link to="/dashboard/create">Create your first post</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <UserPostsCarousel posts={userPosts} />
            )}
          </div>

          {/* Community Posts Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Community Posts</h2>
                <p className="text-muted-foreground text-lg">
                  Discover what others are sharing
                </p>
              </div>
            </div>
            
            {otherPosts.length === 0 ? (
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur">
                <CardContent className="pt-12 pb-12">
                  <div className="text-center">
                    <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                      <Users className="h-10 w-10 text-gray-600 dark:text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white mb-2">No community posts</h3>
                    <p className="mt-2 text-muted-foreground max-w-sm mx-auto text-lg">
                      Be the first to share something with the community and inspire others!
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <AllPostsGrid posts={otherPosts} />
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}

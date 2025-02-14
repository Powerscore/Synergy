import {
  FlatList,
  ActivityIndicator,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import tw from "twrnc";
import Colors from "@/constants/Colors"; // Import Colors
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen() {
  const [posts, setPosts] = useState<
    { id: number; user_id: number; title: string; body: string }[]
  >([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const colorScheme = useColorScheme();

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://gorest.co.in/public/v2/posts?page=${page}`
      );
      const newPosts = await response.json();
      if (newPosts.length === 0) setHasMore(false);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View
      style={tw`flex-1 items-center justify-center p-4`}>
      <View style={tw`flex-row items-center justify-center`}>
        <Text
          style={tw`text-2xl font-bold mr-4 mb-2`}>
          Welcome to Syngery
        </Text>
        <FontAwesome
          name="comment"
          size={30}
          color={Colors[colorScheme ?? "light"].tint}
        />
      </View>
      <View
        style={tw`w-full h-px ${
          colorScheme === "dark" ? "bg-gray-700" : "bg-gray-300"
        } mb-6`}
      />
      <FlatList
        data={posts}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Combining id and index for unique keys
        renderItem={({ item }) => (
          <Link href={`../Postdetails?id=${item.id}`} asChild>
            <TouchableOpacity>
              <PostCard userID={item.user_id} postID={item.id} />
            </TouchableOpacity>
          </Link>
        )}
        onEndReached={fetchPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={Colors[colorScheme ?? "light"].tint}
            />
          ) : null
        }
      />
    </View>
  );
}

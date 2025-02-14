import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, useColorScheme } from "react-native";
import { Avatar } from "react-native-elements";
import tw from "twrnc";

interface CommentCardProps {
  postID: number; // This will be the post's comment ID passed as a prop
}

const CommentCard: React.FC<CommentCardProps> = ({ postID }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // For pagination
  const [hasMore, setHasMore] = useState(true); // To track if there are more comments to load
  const colorScheme = useColorScheme();

  const fetchComments = async () => {
    if (loading || !hasMore) return; // Avoid making multiple requests or when no more data

    setLoading(true);
    try {
      const response = await fetch(
        `https://gorest.co.in/public/v2/posts/${postID}/comments?page=${page}`
      );
      const commentsData = await response.json();
      if (commentsData.length === 0) {
        setHasMore(false); // No more comments
      }
      setComments((prevComments) => [...prevComments, ...commentsData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset state when postID changes
    setComments([]);
    setPage(1);
    setHasMore(true);

    fetchComments(); // Initial fetch on mount or when postID changes
  }, [postID]); // Re-fetch when postID changes

  const handleEndReached = () => {
    if (hasMore) {
      fetchComments();
    }
  };

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <View
          key={item.id}
          style={tw`mb-4 p-4 rounded-lg shadow-sm ${
            colorScheme === "dark" ? "bg-zinc-800" : "bg-white"
          }`}
        >
          <View style={tw`flex-row items-center mb-2`}>
            <Avatar
              rounded
              size="medium"
              source={{
                uri: "https://media.istockphoto.com/id/1285124274/photo/middle-age-man-portrait.jpg?s=612x612&w=0&k=20&c=D14m64UChVZyRhAr6MJW3guo7MKQbKvgNVdKmsgQ_1g=",
              }}
              containerStyle={tw`mr-2`}
            />
            <Text
              style={tw`text-lg font-semibold ${
                colorScheme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {item.name}
            </Text>
          </View>
          <Text
            style={tw`text-base ${
              colorScheme === "dark" ? "text-gray-400" : "text-gray-700"
            }`}
          >
            {item.body}
          </Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={handleEndReached} // Trigger pagination when the end is reached
      onEndReachedThreshold={0.5} // Trigger when 50% of the list is visible
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            size="large"
            color={colorScheme === "dark" ? "white" : "black"}
          />
        ) : null
      }
    />
  );
};

export default CommentCard;

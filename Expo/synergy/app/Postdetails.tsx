import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  useColorScheme,
} from "react-native";
import PostCard from "@/components/PostCard";
import tw from "twrnc";
import CommentCard from "@/components/CommentCard";

export default function PostDetailsScreen() {
  // Get the dynamic route param "id"
  var { id } = useLocalSearchParams<{ id: string }>();

  const [post, setPost] = useState<{
    id: number;
    user_id: number;
    title: string;
    body: string;
  } | null>(null);

  const colorScheme = useColorScheme();

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://gorest.co.in/public/v2/posts/${id}`
      );
      const postData = await response.json();
      setPost(postData);
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    fetchPost();
  }, [id]);



  return (
    <View
      style={tw`p-6 ${
        colorScheme === "dark" ? "bg-zinc-900" : "bg-gray-50"
      } min-h-screen`}>
      {post && (
        <View>
          <View style={tw`mb-8`}>
            <PostCard userID={post.user_id} postID={post.id} />
          </View>

          <Text
            style={tw`text-2xl font-bold mb-4 ${
              colorScheme === "dark" ? "text-white" : "text-gray-900"
            }`}>
            Comments
          </Text>

          <CommentCard postID={post.id} />
        </View>
      )}
    </View>
  );
}

import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, useColorScheme } from "react-native";
import tw from "twrnc";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const colorScheme = useColorScheme();

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://gorest.co.in/public/v2/users/7048590/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Post created successfully!");
        setTitle(""); // Clear title after successful post
        setBody(""); // Clear body after successful post
      } else {
        setMessage(result.message || "Failed to create post");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <View style={tw`p-6 ${colorScheme === "dark" ? "bg-zinc-900" : "bg-white"} min-h-screen`}>
      <Text style={tw`text-2xl font-bold mb-4 ${colorScheme === "dark" ? "text-white" : "text-black"}`}>
        Create a New Post
      </Text>

      <TextInput
        style={tw`border p-2 mb-4 rounded-lg ${colorScheme === "dark" ? "bg-zinc-800 text-white" : "bg-white text-black"}`}
        placeholder="Title"
        placeholderTextColor={colorScheme === "dark" ? "#b3b3b3" : "#777777"} // Light grey placeholder text
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={tw`border p-2 mb-4 rounded-lg ${colorScheme === "dark" ? "bg-zinc-800 text-white" : "bg-white text-black"}`}
        placeholder="Body"
        placeholderTextColor={colorScheme === "dark" ? "#b3b3b3" : "#777777"} // Light grey placeholder text
        value={body}
        onChangeText={setBody}
        multiline
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={tw`p-3 rounded-lg ${colorScheme === "dark" ? "bg-slate-600" : "bg-slate-700"}`}
        disabled={!title || !body}
      >
        <Text style={tw`text-white text-center font-bold`}>
          {message.includes("Posting") ? "Posting..." : "Post"}
        </Text>
      </TouchableOpacity>

      {message && (
        <Text style={tw`mt-4 text-lg ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </Text>
      )}
    </View>
  );
};

export default NewPost;

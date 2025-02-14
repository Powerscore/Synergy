import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native";
import tw from "twrnc";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("https://gorest.co.in/public/v2/users/7699751");
      const userData = await response.json();
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
        <ActivityIndicator size="large" color={colorScheme === "dark" ? "gray" : "white"} />  
    );
  }

  if (!user) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
        <Text style={tw`text-lg text-gray-900`}>Failed to load profile</Text>
      </View>
    );
  }

  return (
    <View style={tw`${colorScheme === "dark" ? "bg-zinc-900" : "bg-gray-50"} p-6 min-h-screen`}>
      <View style={tw`flex items-center`}>
        {/* Profile Picture Placeholder */}
        <Image
          source={{ uri: "https://media.istockphoto.com/id/1285124274/photo/middle-age-man-portrait.jpg?s=612x612&w=0&k=20&c=D14m64UChVZyRhAr6MJW3guo7MKQbKvgNVdKmsgQ_1g=" }} // Replace with actual image URL if available
          style={tw`w-32 h-32 rounded-full mb-4 border-4 ${colorScheme === "dark" ? "border-white" : "border-gray-800"}`}
        />
        <Text style={tw`text-4xl font-bold mb-2 ${colorScheme === "dark" ? "text-white" : "text-gray-900"}`}>
          {user.name}
        </Text>
        <Text style={tw`text-xl text-gray-500 mb-6`}>{user.email}</Text>
      </View>

      <View style={tw`bg-white rounded-lg shadow-lg p-6 mb-4 ${colorScheme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}>
        <Text style={tw`text-lg font-semibold ${colorScheme === "dark" ? "text-white" : "text-gray-900"}`}>
          Gender:
        </Text>
        <Text style={tw`text-lg ${colorScheme === "dark" ? "text-white" : "text-gray-900"}`}>{user.gender}</Text>
      </View>

      <View style={tw`bg-white rounded-lg shadow-lg p-6 ${colorScheme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}>
        <Text style={tw`text-lg font-semibold ${colorScheme === "dark" ? "text-white" : "text-gray-900"}`}>
          Status:
        </Text>
        <Text style={tw`text-lg ${colorScheme === "dark" ? "text-white" : "text-gray-900"}`}>{user.status}</Text>
      </View>

    </View>
  );
};

export default Profile;

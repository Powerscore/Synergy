import React from "react";
import {
  View,
  Text,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-paper";
import { Avatar } from "react-native-elements";
import tw from "twrnc";

interface PostCardProps {
  userID: number;
  postID: number;
}

const PostCard: React.FC<PostCardProps> = ({ userID, postID }) => {
  var [userName, setUserName] = React.useState("");
  var [userAvatar, setUserAvatar] = React.useState("https://media.istockphoto.com/id/1285124274/photo/middle-age-man-portrait.jpg?s=612x612&w=0&k=20&c=D14m64UChVZyRhAr6MJW3guo7MKQbKvgNVdKmsgQ_1g=");
  var [title, setTitle] = React.useState("");
  var [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const colorScheme = useColorScheme();

  const fetchUser = async () => {
    setLoading(true);
    fetch(`https://gorest.co.in/public/v2/users/${userID}`)
      .then((response) => response.json())
      .then((response) => {
        if (response != undefined && response.name) {
          setUserName(response.name);
          setUserAvatar(
            "https://media.istockphoto.com/id/1285124274/photo/middle-age-man-portrait.jpg?s=612x612&w=0&k=20&c=D14m64UChVZyRhAr6MJW3guo7MKQbKvgNVdKmsgQ_1g="
          );
        } else {
          setUserName("John Doe");
          setUserAvatar(
            "https://media.istockphoto.com/id/1285124274/photo/middle-age-man-portrait.jpg?s=612x612&w=0&k=20&c=D14m64UChVZyRhAr6MJW3guo7MKQbKvgNVdKmsgQ_1g="
          );
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPost = async () => {
    setLoading(true);
    fetch(`https://gorest.co.in/public/v2/posts/${postID}`)
      .then((response) => response.json())
      .then((response) => {
        if (response != undefined && response.title) {
          setTitle(response.title);
          setContent(response.body);
        } else {
          setTitle("Unknown");
          setContent("Unknown");
        }
      })
        .finally(() => {
            setLoading(false);
        })
      .catch((error) => {
        console.error(error);
      });
  };
  React.useEffect(() => {
    fetchUser();
    fetchPost();
  }, [postID]);

  if (loading) {
    return <ActivityIndicator size="large" color="gray" />;
  }

  return (
    <Card
      style={tw`p-4 rounded-2xl shadow-md ${
        colorScheme === "dark" ? "bg-zinc-900" : "bg-white"
      } w-full mb-4`}>
      <View style={tw`flex-row items-center mb-2`}>
        <Avatar
          rounded
          size="medium"
          source={{ uri: userAvatar }}
          containerStyle={tw`mr-2`}
        />
        <Text
          style={tw`text-lg font-semibold ${
            colorScheme === "dark" ? "text-white" : "text-black"
          }`}>
          {userName}
        </Text>
      </View>
      <Text
        style={tw`text-xl font-bold mb-2 ${
          colorScheme === "dark" ? "text-white" : "text-black"
        }`}>
        {title}
      </Text>
      <Text
        style={tw`text-gray-700 ${
          colorScheme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
        {content}
      </Text>
    </Card>
  );
};

export default PostCard;

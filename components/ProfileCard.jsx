import { View, Text, Image, TouchableOpacity } from "react-native";

const ProfileCard = ({ profile, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-row items-center p-4 border-b border-gray-300">
            <Image source={{ uri: profile.avatar }} className="w-12 h-12 rounded-full mr-4" />
            <View>
                <Text className="font-bold text-lg">{profile.username}</Text>
                <Text className="text-sm text-gray-600">{profile.role === "business" ? "Business" : "User"}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProfileCard;

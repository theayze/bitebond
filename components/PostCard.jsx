import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { icons } from "../constants";

const PostCard = ({ post }) => {
    const [play, setPlay] = useState(false);
    const navigation = useNavigation();

    const { title, owner, actor, thumbnail, post: video } = post;
    const isVideo = !!video;

    const handleProfilePress = () => {
        if (actor && actor.$id) {
            navigation.navigate('profileView/UserProfile', { userId: actor.$id });
        }
        if (owner && owner.$id) {
            navigation.navigate('profileView/UserProfile', { userId: owner.$id });
        }
    };

    const imageUrl = actor?.avatar || owner?.avatar || 'default-avatar-url';

    return (
        <View className="flex flex-col items-center px-4 mb-14">
            <View className="flex flex-row gap-3 items-start">
                <View className="flex justify-center items-center flex-row flex-1">
                    <TouchableOpacity onPress={handleProfilePress} className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        <Image
                            source={{ uri: imageUrl }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </TouchableOpacity>

                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                        <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}
                        >
                            {actor?.username || owner?.username || 'Unknown'}
                        </Text>
                    </View>
                </View>

                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>

            {isVideo ? (
                play ? (
                    <Video
                        source={{ uri: video }}
                        className="w-full h-60 rounded-xl mt-3"
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        shouldPlay
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                setPlay(false);
                            }
                        }}
                    />
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                        className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
                    >
                        <Image
                            source={{ uri: thumbnail }}
                            className="w-full rounded-xl h-full mt-3"
                            resizeMode="cover"
                        />
                        <Image
                            source={icons.play}
                            className="w-12 h-12 absolute"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )
            ) : (
                <View className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />
                </View>
            )}
        </View>
    );
};

export default PostCard;

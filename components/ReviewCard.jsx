import React from 'react';
import { View, Text, Image } from 'react-native';

const ReviewCard = ({ review }) => {
    const { user, rating, comment, createdAt } = review;

    return (
        <View className="border-white p-4 rounded-lg mb-4">
            <View className="flex-row items-center mb-2">
                <Image
                    source={{ uri: user?.avatar || 'default-avatar-url' }}
                    className="w-10 h-10 rounded-full mr-3"
                    resizeMode="cover"
                />
                <View>
                    <Text className="text-white font-psemibold">{user?.username || 'Anonymous'}</Text>
                    <Text className="text-gray-400 text-xs">{new Date(createdAt).toLocaleDateString()}</Text>
                </View>
            </View>
            <Text className="text-yellow-500 mb-2">{'⭐'.repeat(rating)}</Text>
            <Text className="text-white">{comment}</Text>
        </View>
    );
};

export default ReviewCard;

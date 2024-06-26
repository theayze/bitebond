import React from 'react';
import { View, Text, FlatList } from 'react-native';

const Review = ({ reviews }) => {
    return (
        <View className="flex-1 bg-primary">
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="p-4 border-b border-gray-200">
                        <Text className="text-white font-semibold">{item.username}</Text>
                        <Text className="text-gray-100 mt-2">{item.review}</Text>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text className="text-white text-center mt-4">No reviews found</Text>
                )}
            />
        </View>
    );
};

export default Review;

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const TabBar = ({ selectedTab, setSelectedTab }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <TouchableOpacity
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                    backgroundColor: selectedTab === 'posts' ? 'white' : 'transparent'
                }}
                onPress={() => setSelectedTab('posts')}
            >
                <Text style={{ color: selectedTab === 'posts' ? 'black' : 'white' }}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                    backgroundColor: selectedTab === 'reviews' ? 'white' : 'transparent'
                }}
                onPress={() => setSelectedTab('reviews')}
            >
                <Text style={{ color: selectedTab === 'reviews' ? 'black' : 'white' }}>Reviews</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TabBar;

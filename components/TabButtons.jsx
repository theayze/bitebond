// src/components/TabButtons.jsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TabButtons = ({ selectedTab, setSelectedTab }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'image' && styles.activeTab]}
                onPress={() => setSelectedTab('image')}
            >
                <Text style={[styles.tabText, selectedTab === 'image' && styles.activeTabText]}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tabButton, selectedTab === 'video' && styles.activeTab]}
                onPress={() => setSelectedTab('video')}
            >
                <Text style={[styles.tabText, selectedTab === 'video' && styles.activeTabText]}>Video</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    activeTab: {
        backgroundColor: 'white',
    },
    tabText: {
        color: 'white',
    },
    activeTabText: {
        color: 'black',
    },
});

export default TabButtons;

import { View, SectionList, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../../components/EmptyState';
import { getUserPosts, signOut } from '../../lib/appwrite';
import PostCard from '../../components/PostCard';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import TabBar from '../../components/TabBar';
import Review from '../../components/Review';

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const [posts, setPosts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('posts');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userPosts = await getUserPosts(user.$id);
                console.log('Fetched posts:', userPosts); // Debug log
                setPosts(userPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user?.$id) {
            fetchPosts();
        }
    }, [user]);

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);

        router.replace('/sign-in');
    };

    const renderPosts = () => (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <PostCard post={item} />
            )}
            ListEmptyComponent={() => (
                <EmptyState
                    title="No Posts Found"
                    subtitle="No results found for your search query"
                />
            )}
        />
    );

    const renderContent = () => {
        if (selectedTab === 'posts') {
            return renderPosts();
        } else if (selectedTab === 'reviews') {
            return <Review reviews={reviews} />;
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView className="bg-primary h-full justify-center items-center">
                <Text style={{ color: 'white' }}>Loading...</Text>
            </SafeAreaView>
        );
    }

    const renderHeader = () => (
        <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={logout}
            >
                <Image source={icons.logout}
                    resizeMode='contain' className="w-6 h-6" />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image source={{ uri: user?.avatar }}
                    className="w-[90%] h-[90%] rounded-lg" resizeMode='cover' />
            </View>

            <InfoBox
                title={user?.username}
                containerStyles="mt-5"
                titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
                <InfoBox
                    title={posts?.length || 0}
                    subtitle="Posts"
                    containerStyles='mr-10'
                    titleStyles="text-xl"
                />
                <InfoBox
                    title="1.2k"
                    subtitle="Followers"
                    titleStyles="text-xl"
                />
            </View>

            {user?.role === 'business' && (
                <TabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            )}
        </View>
    );

    const sections = [
        { title: 'header', data: [{}] },
        { title: 'content', data: user?.role === 'business' ? [{}] : posts }
    ];

    return (
        <SafeAreaView className="bg-primary h-full">
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, section }) => {
                    if (section.title === 'header') {
                        return renderHeader();
                    } else if (section.title === 'content') {
                        return user?.role === 'business' ? renderContent() : <PostCard post={item} />;
                    }
                }}
                ListEmptyComponent={() => (
                    user?.role === 'business' ? null : (
                        <EmptyState
                            title="No Posts Found"
                            subtitle="No results found for your search query"
                        />
                    )
                )}
            />
        </SafeAreaView>
    );
};

export default Profile;

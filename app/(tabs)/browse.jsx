import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import PostCard from '../../components/PostCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Browse = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();

    const { data: posts, refetch } = useAppwrite(getAllPosts);

    const { data: latestPosts } = useAppwrite(getLatestPosts);

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = async () => {
        setRefreshing(true);
        // re-call videos: if any new videos appeard
        await refetch();
        setRefreshing(false);
    }


    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <PostCard post={item} />
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 space-y-6">
                        <SearchInput />

                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-white text-lg font-pregular mb-3">
                                Trending
                            </Text>

                            <Trending posts={latestPosts ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Posts Found"
                        subtitle="Upload your first post now!"
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    )
}

export default Browse
import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { BookOpen } from 'lucide-react'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-16 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 bg-indigo-50 rounded-full">
                            <BookOpen className="w-12 h-12 text-indigo-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                            Welcome to MegaBlog
                        </h1>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Sign in to explore amazing stories or share your own thoughts with the world.
                        </p>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
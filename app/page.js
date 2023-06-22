'use client'
import CommentSection from '@/Components/CommentSection'
import { getTimeAgo } from '@/utils/functions';
import Image from 'next/image';
import { useEffect, useState } from 'react';


export default function Home() {

  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      const response = await fetch(
        `http://localhost:3000/api/hnstory`
      );
      const data = await response.json();
      setStoryData(data);
    };
    fetchStory();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <h1 className="mb-10 text-4xl font-bold">Nested Comments</h1>
      { 
        storyData !== null 
        ? 
        <>
          <div className="story w-[700px] bg-[#b1b1b1] px-4 py-2 rounded-lg">
          <div className="flex items-center">
                    <div>
                        <Image
                            src = "https://avatar.vercel.sh/ldhgrh"
                            alt = "avatar"
                            width = {30}
                            height = {30}
                            className = "rounded-full mr-2"
                        />
                    </div>
                    <div>
                        <p className="font-bold">{storyData.story.by}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 ml-2 text-sm">{getTimeAgo(storyData.story.time)}  |</p>
                    </div>
                    <div>
                        <p className="text-gray-500 ml-2 text-sm">{storyData.story.descendants} comments</p>
                    </div>
                </div>
                <div>
                    <p className="text-xl">{storyData.story.title}</p>
                </div>
          </div>
          <CommentSection comments={storyData.comments} />
        </>
      :
        null
      }
    </main>
  )
}

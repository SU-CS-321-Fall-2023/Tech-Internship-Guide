import React from "react";
import { FeaturedStory } from "../components/FeaturedStory";
import { useFetch } from '../hooks/useFetch';

export const Story = () => {
    const storyDATA = useFetch("stories");
    
    return(
        <div className="text-light">
            {storyDATA.map((item, index) => (
                <FeaturedStory featuredItem={item} key={index}/>
            ))}   
        </div>
    );
};
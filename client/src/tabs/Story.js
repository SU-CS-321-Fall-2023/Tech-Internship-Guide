import React from "react";
import { FeaturedStory } from "../components/FeaturedStory";
import { useFetch } from '../hooks/useFetch';

export const Story = () => {
    const {data} = useFetch("stories");
   

    return(
        <div className="text-light">
            {data.map((item, index) => (
                <FeaturedStory featuredItem={item} key={index} personName = {item.personName}/>
            ))}   
        </div>
    );
};
import React from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export const FeaturedStory = (props) => {
    const { featuredItem, personName } = props;

    return(
        <div className="container p-3 px-5 mb-3">
            <div className="row px-5" style={{alignItems: 'center'}}>
                <div className="col-md-2 p-3 me-1">
                    <PersonOutlineIcon className="img-fluid" style={{width: '100%', height: '100%'}}/>
                </div>
                <div className="col-md-9 rounded">
                    <i>
                        <h5>
                            Software Engineering Intern, {featuredItem?.company}
                        </h5>
                        <div>
                            {featuredItem?.story}
                        </div>
                    </i>
                </div>
            </div>
        </div>
    );
};
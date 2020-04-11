import React from 'react';
import {Tag} from '../../ui/misc';
import Blocks from './Blocks';

const MatchesHome = () => {
    //if we need to pass additional properties we use add={{}}.
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag 
                    link={false} 
                    bck="#0e1731"
                    size="50px"
                    color="#ffffff"
                    /* add={{
                        color: 'red'
                    }} */
                >
                    Matches
                </Tag>

                <Blocks></Blocks>

                <Tag
                    link={true}
                    linkTo="/the_team" 
                    bck="#ffffff"
                    size="22px"
                    color="#0e1731"
                >
                    See More Matches
                </Tag>
            </div>
            
        </div>
    );
};

export default MatchesHome;
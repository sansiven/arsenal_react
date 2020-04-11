import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import {firebase} from '../../../firebase'

const AdminNav = () => {

    const links = [
        {
            title:'Matches',
            linkTo: '/admin_matches' 
        },
        {
            title: 'Add Match',
            linkTo: '/admin_matches/edit_match'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title:'Add Players',
            linkTo: '/admin_players/add_player'
        },
        
    ]

    const style = {
        color: "#ffffff",
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    }

    const logOutHandler = () => {
        firebase.auth().signOut().then(()=>{
            console.log('Log Out successfully')
        }, (error) => {
            console.log('Error logginf out')
        })
    }

    const renderItems = () => (
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={style}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    )

    return (
        <div>
            {renderItems()}
            <ListItem button style={style} onClick={()=> logOutHandler()}>
                Log Out
            </ListItem>
        </div>
    );
};

export default AdminNav;
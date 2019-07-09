import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <>
                <Link to='/dont-click-me-twice-react'>Game</Link>
                <br />
                <Link to='/dont-click-me-twice-react/About'>Instructions</Link>
            </>
        )
    }
}

export default Nav;
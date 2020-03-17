import { map } from 'underscore'
import { Link } from "react-router-dom"
import React, { Component } from 'react'

const SECTIONS = [
    { title: 'Countries', href: '/countries' }
];

class Router extends Component {
    render() {
        return (
            <div className='Home'>
                <div className='Home-Body'>
                    <div className='SectionNavigation'>
                        {map(SECTIONS, ({ title, href }) => (
                            <Link className='SectionNavigation-Item Section' to={href} key={href}>
                                <span className='Section-Title'>{title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Router;
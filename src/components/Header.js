import { map } from 'underscore'
import { NavLink as RRNavLink } from 'react-router-dom';
import React, { Component } from 'react'
import { Col, Row, Nav, NavItem, NavLink } from 'reactstrap';

const SECTIONS = [
    { title: 'Home', href: '/' },
    // { title: 'Countries', href: '/countries' }
];

class Header extends Component {
    render() {
        return (
            <Row>
                <Col sm="12">
                    <Nav>
                        {map(SECTIONS, ({ title, href }) => (
                            <NavItem key={href.toString()}>
                                <NavLink className='SectionNavigation-Item Section' to={href} tag={RRNavLink}>
                                    <span className='Section-Title'>{title}</span>
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                </Col>
            </Row>
        )
    }
}

export default Header;
import React from 'react';
import '../nav/Nav.css';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Button from '@mui/material/Button';
import CallIcon from '@mui/icons-material/Call';

const Nav=()=>{
    return(
        <div className='nav d-flex align-items-center'>
            <div className='container-fluid'>
                <div className='row' >
                <div className='col-sm-2'>
                        <img className="logo" src={Logo} alt='Logo'/>
                    </div>
                
                <div className='col-sm-7 part2'>
                    <nav>
                        <ul className='list list-inline mb-0'>
                            <li className='list-inline-item'>
                                <Button><Link to="/Home">Home</Link></Button>
                            </li>
                           
                            <li className='list-inline-item'>
                                <Button><Link to="/Deals">Deals</Link></Button>
                            </li>
                            <li className='list-inline-item'>
                                <Button><Link>Shops</Link></Button>
                            </li>
                            <li className='list-inline-item'>
                                <Button><Link>Vendors</Link></Button>

                            </li>
                             <li className='list-inline-item'>
                                <Button><Link to="/About">About</Link></Button>
                            </li>
                            <li className='list-inline-item'>
                                <Button><Link>Contact</Link></Button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='col-sm-2 part3 d-flex align-items-center'>
                    <div className='phNo d-flex align-items-center'>
                        <span><CallIcon/></span>
                        <div className='info ml-3'>
                            <h3 className='text-g'>1900-888-000</h3>
                            <p className='mb-2'>24/7 Support Center</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Nav;
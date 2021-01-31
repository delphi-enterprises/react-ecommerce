import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { openMenu } from '../../actions';
import { useWindowSize } from '../../hooks';
import SideMenu from '../SideMenu/SideMenu';

import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu.svg';
import userIcon from '../../assets/user.svg';
import zoomIcon from '../../assets/zoom.svg';
import cartIcon from '../../assets/cart.svg';

const HeaderWrapper = styled.div`
  background-color: #11504f;
  height: 64px;
  display: flex;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
`;

const MenuItem = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-family: "Lato", sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 20px;
`;

const Logo = styled.img`
  margin-left: 20px;
  margin-top: 9px;
  max-height: 46px;
  width: auto;
  height: auto;
`;

const MenuIconWrapper = styled.div`
  width:100%;
  padding-right: 10px;
`;

const SearchBoxWrapper = styled.div`
  width: 325px;
  height: 37px;
  margin: auto;
  background-color: white;
  display: flex;
  padding: 5px;
`;

const SearchBoxInput = styled.input`
  flex-grow: 4;
  border: 1px solid black;
`;

const SearchBoxButton = styled.div`
  flex-grow: 1;
  background-color: black;
  color: #fff;
  font-family: "Lato", sans-serif;
  text-transform: uppercase;
  font-weight: lighter;
  text-align: center;
  padding: 10px;
`;

const HeaderIcon = styled.img`
  size: 20px;
  margin: 10px;
`;

const navItems = [
  { name: 'Mens', route: '/' },
  { name: 'Womens', route: '/' },
  { name: 'Accessories', route: '/' },
  { name: 'Sale!', route: '/' },
];

const icons = [cartIcon, userIcon];

const Header = () => {
  const [searching, setSearching] = React.useState(false);

  const size = useWindowSize();

  const dispatch = useDispatch();

  const isMenuOpen = useSelector((state) => state.menuOpen);

  return (
    <div>
      <HeaderWrapper>
        <HeaderIcon src={menuIcon} onClick={() => dispatch(openMenu())} />
        <Logo src={logo} />
        <MenuWrapper>
          {size.width > 1024 ? (
            <>
              {navItems.map(item => (
                <MenuItem className="navbar-brand" to={item.route}>
                  {item.name}
                </MenuItem>
              ))}
            </>
          ) : null}
          <MenuIconWrapper>
            {icons.map(item => (
              <img className="icon float-right" src={item} />
            ))}
            <HeaderIcon className="float-right" src={zoomIcon} onClick={() => setSearching(!searching)} />
          </MenuIconWrapper>
        </MenuWrapper>
      </HeaderWrapper>
      {
        searching ? (
          <SearchBoxWrapper>
            <SearchBoxInput />
            <SearchBoxButton onClick={() => setSearching(!searching)}>GO</SearchBoxButton>
          </SearchBoxWrapper>
        )
          : ''
      }
      {
        isMenuOpen ? (
          <SideMenu />
        )
          : ''
      }
    </div>
  );
};

export default Header;

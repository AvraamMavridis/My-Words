import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router'
import styles from './TopMenu.scss';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class TopMenu extends Component {

  constructor(){
    super();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.state = {
      current: 'mail'
    }
  }

  onClickHandler(e){
    this.setState({ current: e.key });
  }

  render() {
    return (
      <Menu
        className={ styles.topmenu }
        onClick={this.onClickHandler}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Icon type="home" /><Link to={'/'}>Home</Link>
        </Menu.Item>
        <Menu.Item key="book">
          <Icon type="book" />
          <Link to={'/mywords'}>Words</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default TopMenu;
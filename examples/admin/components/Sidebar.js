import React from 'react';
import {
  Link,
} from 'react-router';
import {
  List,
  ListItem,
  Icon,
} from 'amazeui-react';

const navs = [
  {
    id: 'home',
    title: '首页',
    icon: 'home'
  },
  {
    id: 'group',
    title: '菜单组 1',
    icon: 'folder',
    subNav: 4,
  },
  {
    id: 'group',
    title: '菜单组 2',
    icon: 'folder',
    subNav: 5,
  },
  {
    id: 'group',
    title: '菜单组 3',
    icon: 'folder',
    subNav: 15,
  },
  {
    id: 'group',
    title: '菜单组 4',
    icon: 'folder',
    subNav: 3,
  },
  {
    id: 'about',
    title: '系统信息',
    icon: 'info'
  }
];

const Siderbar = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
  },

  getInitialState() {
    return {
      activeIndex: null
    };
  },

  handleClick(index, e) {
    e.preventDefault();

      this.setState({
        activeIndex: this.state.activeIndex === index ? null: index,
      });
  },

  renderSubNavs(lenth) {
    let subNavs = [];

    for (let i = 0; i <= lenth; i++) {
      subNavs.push(
        <ListItem
          key={`subNav-${i}`}
        >
          <Link
            to={`page-${i}`}
            query={{breadcrumb: `子页面 ${i}`}}
            activeClassName="active"
          >
            <Icon icon="angle-right" />
            {` 子菜单 ${i}`}
          </Link>
        </ListItem>
      )
    }

    return (
      <List
        className="adm-sidebar-sub"
      >
        {subNavs}
      </List>
    );
  },

  renderItems() {
    return navs.map((nav, i) => {
      const {
        subNav,
        id,
        icon,
        title,
        } = nav;
      const subActive = this.state.activeIndex === i ? 'sub-active' : null;

      return (
        <ListItem
          key={`nav-${i}`}
          className={subActive}
        >
          <Link
            activeClassName="active"
            to={`/${id}`}
            query={{breadcrumb: title}}
            onClick={subNav ? this.handleClick.bind(this, i) : null}
          >
            <Icon icon={subActive ? 'folder-open' : icon} />
            {` ${title}`}
          </Link>
          {subNav ? this.renderSubNavs(subNav) : null}
        </ListItem>
      );
    });
  },

  render() {
    const active = this.props.active ? 'active' : '';

    return (
      <div
        className={`adm-sidebar ${active}`}
      >
        <List>
          {this.renderItems()}
        </List>
      </div>
    );
  }
});

export default Siderbar;

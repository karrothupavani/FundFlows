import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {
  AttachMoney,
  CreditCard,
  Gavel,
  MonetizationOn, 
  Payment,
  Receipt,
  AccountBalanceWallet, 
  AccountBalanceOutlined, 
  AccountBalance,
  LocalAtm,
  LocalAtmSharp,
} from '@mui/icons-material';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const sidebarItems = [
    { name: 'P2P Payments', icon: <Payment /> },
    { name: 'P2P Loans', icon: <AccountBalance  /> },
    { name: 'RO-RO Loans', icon: <MonetizationOn  /> },
    { name: 'P2R Surplus', icon: <AttachMoney  /> },
    { name: 'Payments', icon: <CreditCard  /> },
    { name: 'R2C Surplus', icon: <LocalAtm  /> },
    { name: 'Receipt From RO', icon: <Receipt  />},
    { name: 'CO Levies', icon: <Gavel  /> },
    { name: 'Assets Funds', icon: <AccountBalanceWallet  /> },
    { name: 'Term Loan Setoff', icon: <LocalAtmSharp  /> },
    { name: 'Reserves', icon: <AccountBalanceOutlined  />},
  ];

  const handleMenuItemClick = () => {
    if (collapsed) {
      setCollapsed(false);
     return;
    }
    
    setCollapsed(true);
    
  };
const handleMouseItemClick =()=>{
  if (collapsed) {
    
   return;
  }
  
  setCollapsed(true);
}
  return (
    <div
      style={{
        width: collapsed ? 80 : 250,
        transition: 'width 0.2s',
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 0,
          width: collapsed ? 80 : 200,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['P2P Payments']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        style={{ padding: "-10px" }}
      >
        {sidebarItems.map((item, index) => (
          <Menu.Item
            key={index}
            icon={item.icon}
            style={{ margin:"5px -5px 8px 0px",padding:"-5px -5px -5px -5px"  }}
            onClick={handleMenuItemClick}
            onMouseEnter={handleMouseItemClick}
            onMouseLeave={handleMouseItemClick}
          >
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Sidebar;

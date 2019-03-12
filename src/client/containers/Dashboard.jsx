import React, { Component } from 'react'
import { Tree, Menu, Dropdown, Modal, Icon } from 'antd'
const axios = require('axios');

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const MenuItemGroup = Menu.ItemGroup;

function treeMap(branch){
  return (branch.map((tree) => {
    if(tree.type === "directory" && tree.type != "report"){
      return(
        <TreeNode title={tree.name} key={tree.name}>
          {treeMap(tree.contents)}
        </TreeNode>
      );
    }
    else if(tree.type != "report"){
      //console.log(tree.name);
      return (
        <TreeNode title={tree.name} key={tree.name} isLeaf />
      );
    }
  }));
};



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          filetree: [],
          current: "files",
          visible: false,
          vfilename: "",
        }
    }

    componentDidMount(){
      this.getTree();
    }

    getTree(){
      axios.get('http://localhost:4000/dashboard/31')
     .then(response => {
       this.setState({
         filetree: response.data
       });
     })
     .catch((err) => {console.log(err)})
    }


    onSelect = () => {
      console.log('Trigger Select');
    };

    onExpand = () => {
      console.log('Trigger Expand');
    };

    handleClick = (e) => {
      console.log('click', e);
      this.setState({
        current: e.key,
      });
    }

    onRightClick = (e) => {
      console.log("Right clicked", e.name)
      this.setState({
        visible: true,
      })
    }

    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }


    switcher= () =>{

        if(this.state.current === 'files' && this.state.filetree != []){
          return(
            <DirectoryTree
              multiple
              defaultExpandAll
              onSelect={this.onSelect}
              onExpand={this.onExpand}
              className={this.dashboard}
              onRightClick={this.onRightClick}
            >
              {treeMap(this.state.filetree)}
            </DirectoryTree>
          )
        }else if(this.state.current === 'settings'){
          return(
            <h1> Settings</h1>
          )
        }

    }


    render() {
      return (
        <div>

          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="files">
              <Icon type="file" /> Files
            </Menu.Item>

            <Menu.Item key="settings">
              <Icon type="setting" /> Settings
            </Menu.Item>
          </Menu>

          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>

          {this.switcher()}

          </div>


      );
    }
}

export default Dashboard

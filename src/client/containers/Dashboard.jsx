import React, { Component } from 'react'
import { Tree, Menu, Dropdown, Modal, Icon } from 'antd'
const axios = require('axios');

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const MenuItemGroup = Menu.ItemGroup;
/*
async function fileTree(){
  try{
    return await axios.get('http://localhost:4000/dashboard/31');
  } catch(error){
    console.error(error);
  }
}
*/
const strng = "poop/butt"
console.log(strng);


function treeMap(branch){
  return (branch.map((tree) => {
    if(tree.type === "directory" && tree.type != "report"){
      console.log(tree.name);
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

    state = {
      current: 'files'
    }

    handleClick = (e) => {
      console.log('click', e);
      this.setState({
        current: e.key,
      });
    }

    switcher= () =>{

        if(this.state.current === 'files'){
          console.log("yeet");
          return(
            <DirectoryTree
              multiple
              defaultExpandAll
              onSelect={this.onSelect}
              onExpand={this.onExpand}
              className={this.dashboard}
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

          {this.switcher()}

          </div>


      );
    }
}

export default Dashboard

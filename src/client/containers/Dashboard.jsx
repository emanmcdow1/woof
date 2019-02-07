import React, { Component } from 'react'
import { Tree, Menu, Dropdown, Modal, Icon } from 'antd'

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const MenuItemGroup = Menu.ItemGroup;

const filetree = [
  {"type":"directory","name":"src/server","contents":[
    {"type":"directory","name":"config","contents":[
      {"type":"file","name":"config.json"}
    ]},
    {"type":"directory","name":"controllers","contents":[
      {"type":"file","name":"index.js"},
      {"type":"file","name":"user.js"}
    ]},
    {"type":"file","name":"index.js"},
    {"type":"directory","name":"migrations","contents":[
      {"type":"file","name":"20181231050857-create-user.js"}
    ]},
    {"type":"directory","name":"models","contents":[
      {"type":"file","name":"index.js"},
      {"type":"file","name":"user.js"}
    ]},
    {"type":"file","name":"routes.js"}
  ]},
]

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
              {treeMap(filetree)}
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

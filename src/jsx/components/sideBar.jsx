import React from 'react';
import ReactDOM from 'react-dom';

/*侧边栏*/
class SideBar extends React.Component{
    constructor(){
        super();
        this.state = {
            folders: [],
        }
    }

    componentDidMount(){
        var sideBar = this;
        var getRequest = {};
        var requestParams = JSON.stringify(getRequest);
        var xmlhttp;
        var url = 'http://127.0.0.1:3000/phoenix/getRequest';
        if (window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        }
        else{
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var result = JSON.parse(xmlhttp.responseText);

                var tree = {};
                result.data.forEach(function(v){
                    if(tree[v.categoryId]){
                        tree[v.categoryId].data.push(v);
                    }else{
                        tree[v.categoryId] = {};
                        tree[v.categoryId].id = v.categoryId;
                        tree[v.categoryId].name = v.categoryName;
                        tree[v.categoryId].data = [];
                        tree[v.categoryId].data.push(v);
                    }
                })

                var folders = [];
                for(var x in tree){
                    folders.push(tree[x]);
                }

                sideBar.setState({
                    folders: folders
                })
            }else{
            }
        }
        xmlhttp.open("POST",url,true);
        xmlhttp.send(requestParams);
    }

    render(){
        return (
            <div className="sideBar">
                <div className="filter">
                    <input type="text" placeholder="Fliter"/>
                </div>
                <div className="menu">
                    <div className="row-box tabs">
                        <a className="active">Collections</a>
                        <a style={{display: 'none'}}>History</a>
                    </div>
                    <div className="folders">
                    {this.state.folders.map(function(v, index) {
                        return (
                            <ul key={index}>
                                <a onClick={() => this.collapseCategory(event, index)}>
                                    <i className={v.expand ? 'iconfont iconfont-expand' : 'iconfont iconfont-collapse'}>&#59047;</i>
                                    <label>{v.name}</label>
                                    <i className='iconfont iconfont-edit'>&#59038;</i>
                                    <i className='iconfont iconfont-delete'>&#59037;</i>
                                </a>
                                <ul style={v.expand ? {display : 'block'} : {display: 'none'}}>
                                    {v.data.map(function(request, index){
                                        return (
                                            <li key={index} 
                                                className="labelCursor" 
                                                onClick={() => this.getRequest(event, request.requestId)}
                                            >
                                                <a className={request.type == 'GET' ? 'type get' : 'type post'}>{request.type}</a>
                                                <a className="title">{request.requestName}</a>
                                            </li>
                                        )
                                    }, this)}
                                </ul>
                            </ul>
                        )
                    }, this)}
                    </div>
                </div>
                <a onClick={() => this.addCategory()} className="bread">+</a>
            </div>
        )
    }

    addCategory(){
        var folders = this.state.folders.slice();
        var newCategory = {};
        newCategory.name = 'Test Folder'; 
        newCategory.data = [];
        folders.push(newCategory);
        this.setState({
            folders: folders
        })
    }

    collapseCategory(event, index){
        var folders = this.state.folders.slice();
        var object = event.srcElement ? event.srcElement : event.target;
        if(object.tagName.toLowerCase() == 'i' && object.className.indexOf('iconfont-edit') > -1){
            ReactDOM.render(
                <ReviseForm categoryName={folders[index].name}/>,
                document.getElementById('modal-revise')
            );
            return;
        }else if(object.tagName.toLowerCase() == 'i' && object.className.indexOf('iconfont-delete') > -1){
            alert('delete');
            return;
        }else{
            folders[index].expand = !folders[index].expand;
            this.setState({
                folders: folders
            })
        }
    }

    getRequest(event, requestId){
        alert('get request');
        // var requestParams = {
        //     requestId: requestId
        // };
        // requestParams = JSON.stringify(requestParams);
        // var xmlhttp;
        // var url = 'http://127.0.0.1:3000/phoenix/getRequest';
        // if (window.XMLHttpRequest){
        //     xmlhttp=new XMLHttpRequest();
        // }
        // else{
        //     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        // }
        // xmlhttp.onreadystatechange=function(){
        //     if (xmlhttp.readyState==4 && xmlhttp.status==200)
        //     {
        //         var result = JSON.parse(xmlhttp.responseText);
        //         console.log(result.data[0]);
        //         // 发布 tab 事件
        //         eventProxy.trigger('tab', result.data[0]);

        //     }else{
        //     }
        // }
        // xmlhttp.open("POST",url,true);
        // xmlhttp.send(requestParams);
    }
}

export default SideBar;
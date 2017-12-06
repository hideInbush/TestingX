import React from 'react';

var jq = require("jquery")();
console.log(jq);

/**选项卡 */
class Tab extends React.Component{
    render(){
        var className = this.props.active ? 'centerAlign textEllipsis post_tabs-actived' : 'centerAlign textEllipsis';
        return (
            <a onClick={ () => this.props.onClick() } className={className} >
                <i className="iconfont">&#xe69a;</i>
                {this.props.name}
            </a>
        )
    }
}

class Posts extends React.Component{
    constructor(){
        super();
        this.state = {
            requestTabs: [{id: 1, active: true},{id: 2, active: false}],
            responseTabs: [{id: 1, active: true},{id: 2, active: false}],
        }
    }

    render(){
        var className = this.props.active ? 'post_card_items' : 'displayNone post_card_items';
        return (
            <div className={className}>
                <div className="post_card_items up">
                    <input type="text" placeholder="请输入接口说明>>" value={this.props.posts.desc || ''}
                        onChange={(event) => this.props.textChange(event, 'desc', this.props.id)}/>
                </div>
                <div className="post_card_items bottom">
                    <div className="post_card_items sendUrl">
                        <div className="row-box post_card_items sendUrl urlPanel">
                            <select 
                                value={this.props.posts.httpType || "POST"} 
                                onChange={(event) => this.props.selectChange(event, this.props.id)}
                            >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                            </select>
                            <input type="text" placeholder="_> URL HERE " value={this.props.posts.url || ''} 
                                onChange={(event) => this.props.textChange(event, 'url', this.props.id)}/>
                            <a onClick={() => this.props.sendRequest(this.props.id)} className="centerAlign">Send</a>
                            <a onClick={() => this.requestSave()} className="save centerAlign">Save</a>
                        </div>
                    </div>
                    <div className="post_card_items params">
                        <div>
                            <div className="tabs">
                                <a onClick={() => this.tabChange('request', '1')} 
                                   className={this.state.requestTabs[0].active ? 'tabs_items-actived' : ''}>JSON</a>
                                <a onClick={() => this.tabChange('request', '2')} 
                                   className={this.state.requestTabs[1].active ? 'tabs_items-actived' : ''}>Header</a>
                                <a className='beautify' onClick={() => this.props.jsonBeautify(this.props.id)}>JSON Beautify</a>
                            </div>
                            <div className="content">
                                <textarea id="requestText" 
                                        onChange={(event) => this.props.textChange(event, 'requestParams', this.props.id)}
                                        className={this.state.requestTabs[0].active ? '' : 'displayNone'}
                                        value={this.props.posts.requestParams || ''} />
                                <textarea id="requestHeader"
                                        className={this.state.requestTabs[1].active ? '' : 'displayNone'}/>
                            </div>
                        </div>
                        <div>
                            <div className="tabs" id="responseTabs">
                                <a onClick={() => this.tabChange('response', '1')} 
                                        className={this.state.responseTabs[0].active ? 'tabs_items-actived' : ''}>JSON</a>
                                <a onClick={() => this.tabChange('response', '2')} 
                                        className={this.state.responseTabs[1].active ? 'tabs_items-actived' : ''}>Header</a>
                            </div>
                            <div className="content" id="responseContent">
                                <pre id="responseText" 
                                        className={this.state.responseTabs[0].active ? '' : 'displayNone'}/>
                                <pre id="responseHeader"
                                        className={this.state.responseTabs[1].active ? '' : 'displayNone'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    tabChange(type, id){
        switch(type){
            case 'request':
                var tabs = this.state.requestTabs;
                tabs.forEach(function(v,i){
                    v.active = false;
                })
                tabs[parseInt(id)-1].active = true;
                this.setState({
                    requestTabs: tabs
                })
                break;
            case 'response':
                var tabs = this.state.responseTabs;
                tabs.forEach(function(v,i){
                    v.active = false;
                })
                tabs[parseInt(id)-1].active = true;
                this.setState({
                    responseTabs: tabs
                })
                break;
        }
    }

    requestSend() {
        // var url = this.state.url;
        // var requestParams = JSON.stringify(JSON.parse(this.state.requestParams));

        console.log(this.state);
        return;
        
        var params = JSON.stringify({});
        $.ajax({
            type: "POST",
            url: './index.php',
            data: params,
            success: function(data){
                var result = JSON.parse(data);
                document.getElementById("responseText").innerHTML = posts.syntaxHighlight(JSON.stringify(result, null ,4));
                // document.getElementById("responseHeader").innerHTML = header;
            }, 
            error: function(){
            }
        })


        var posts = this;

        var xmlhttp;
        var url = "./index.php";
        if (window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        }
        else{
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var header = xmlhttp.getAllResponseHeaders();
                var data = xmlhttp.responseText;
                // posts.setState({
                //     responseParams: JSON.stringify(JSON.parse(data), null, 4),
                //     responseHeader: header
                // })
                
            }else{
            }
        }
        xmlhttp.open("GET",url,true);
        xmlhttp.send();
        
    }

    requestSave(){
        var addCategory = {
            categoryName: 'Halo'
        }

        var addRequest = {
            requestName: 'Test',
            categoryId: '1',
            description: 'test request',
            type: 'POST',
            requestUrl: 'http://',
            requestJson: 'asd',
        };

        var getRequest = {
        };

        var requestParams = JSON.stringify(getRequest);
        var posts = this;

        var xmlhttp;
        // var url = 'http://127.0.0.1:3000/phoenix/addCategory';
        // var url = 'http://127.0.0.1:3000/phoenix/addRequest';
        var url = 'http://127.0.0.1:3000/phoenix/getRequest';
        // var url = 'http://127.0.0.1:3000/potter';
        
        if (window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        }
        else{
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var header = xmlhttp.getAllResponseHeaders();
                var data = xmlhttp.responseText;
                console.log(data);
            }else{
            }
        }
        xmlhttp.open("POST",url,true);
        xmlhttp.send(requestParams);
    }

    /*json语法高亮*/
    syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
}

class TabCard extends React.Component{
    constructor(){
        super();
        this.state = {
            tabs: [
                {
                    id:0, 
                    name: "测试接口1", 
                    active:true, 
                    posts: {
                        httpType : 'POST',
                        url : null,
                        description :  null,
                        requestParams : null,
                        requestHeader : null,
                        responseParams : null,
                        responseHeader : null
                    }
                },
            ]
        };
    }

    componentDidMount() {
        // 监听 tab 事件

        // eventProxy.on('tab', (tab) => {
        //     var tabs = this.state.tabs.slice();
        //     for(var i=0; i<tabs.length; i++){
        //         if(tabs[i].active){
        //             tabs[i].active = false;
        //             break;
        //         }
        //     }

        //     tab.id = tab.categoryId;
        //     tab.name = tab.requestName;
        //     tab.active = true;
        //     tab.posts = {};
        //     tab.posts.httpType = tab.type;
        //     tab.posts.url = tab.requestUrl;
        //     tab.posts.description = tab.description;
        //     tab.posts.requestParams = tab.requestJson;
        //     tab.posts.requestHeader = null;
        //     tab.posts.responseParams = null;
        //     tab.posts.responseHeader = null;

        //     tabs.push(tab);
        //     this.setState({
        //         tabs: tabs
        //     });
        // });
    }

    handleTabClick(event,id){
        /*清楚所有active*/
        var obj = event.srcElement ? event.srcElement : event.target;
        if(obj.className.indexOf('iconfont') == -1){
            var tabs = this.state.tabs.slice();
            tabs.forEach(function(v,i,array){
                v.active = false;
            })
            for(var i=0; i<tabs.length; i++){
                if(tabs[i].id == id){
                    tabs[i].active = true;
                    break;
                }
            }
            this.setState({
                tabs: tabs
            })
        }else{
            var tabs = this.state.tabs.slice();
            for(var i=0; i<tabs.length; i++){
                if(tabs[i].id == id && tabs[i].active == true){
                    tabs.splice(i, 1);
                    if(tabs.length > 0){
                        tabs[0].active = true;
                    }
                }else if(tabs[i].id == id && tabs[i].active == false){
                    tabs.splice(i, 1);
                }
            }

            if(tabs.length == 0){
                var posts = {
                    httpType : 'POST',
                    url : null,
                    desc :  null,
                    requestParams : null,
                    requestHeader : null,
                    responseParams : null,
                    responseHeader : null
                };
                tabs = [{id:1, name: "测试接口1", active:true, posts: posts}];
            }
            this.setState({
                tabs: tabs
            })
        }
        
    }

    handleAddTabs(){
        var tabs = this.state.tabs.slice();
        var newId = parseInt(tabs[tabs.length-1].id) + 1;
        var newName = '测试接口' + newId;
        var posts = {
            httpType : 'POST',
            url : null,
            desc :  null,
            requestParams : null,
            requestHeader : null,
            responseParams : null,
            responseHeader : null
        };
        tabs.push({id:newId, name:newName, active:false, posts: posts});
        this.setState({
            tabs: tabs
        })
    }

    selectChange(event, id){
        var tabs = this.state.tabs.slice();
        for(var i=0; i<tabs.length; i++){
            if(tabs[i].id == id){
                tabs[i].posts.httpType = event.target.value.toUpperCase();
                break;
            }
        }
        this.setState({
            tabs : tabs
        })
    }

    textChange(event, type, id){
        var tabs = this.state.tabs.slice();
        for(var i=0; i<tabs.length; i++){
            if(tabs[i].id == id){
                var value = event.target.value;
                switch(type){
                    case 'url':
                        tabs[i].posts.url = value;
                        break;
                    case 'requestParams':
                        tabs[i].posts.requestParams = value;
                        break;
                    case 'responseParams':
                        tabs[i].posts.responseParams = value;
                        break;
                    case 'desc':
                        tabs[i].posts.desc = value;
                        break;
                }
                this.setState({
                    tabs : tabs
                })
                break;
            }
        }
    }

    jsonBeautify(id) {
        try {
            var tabs = this.state.tabs.slice();
            var index = 0;
            var requestParams;
            for(var i=0; i<tabs.length; i++){
                if(tabs[i].id == id){
                    requestParams = tabs[i].posts.requestParams;
                    index = i;
                    break;
                }
            }
            
            if(requestParams){
                var requestJson = JSON.parse(requestParams);
                var value = JSON.stringify(requestJson, null, 4);

                tabs[index].posts.requestParams = value;
                this.setState({
                    tabs: tabs
                })
            }else{
                alert("格式化数据为空");
            }
        } catch (e) {
            alert(e);
        }
    }

    sendRequest(id){
        var type = this.state.tabs[id]['posts']['httpType'];
        var url = this.state.tabs[id]['posts']['url'];
        var params = {};
        params.type = type;
        params.url = url;
        params.request = this.state.tabs[id]['posts']['requestParams'] || '';
        params = JSON.stringify(params);
        $.ajax({
            type: 'post',
            url: '/transmit',
            data: params,
            success: function(data){
                var result = JSON.parse(data);
                document.getElementById("responseText").innerHTML = posts.syntaxHighlight(JSON.stringify(result, null ,4));
                // document.getElementById("responseHeader").innerHTML = header;
            }, 
            error: function(){
            }
        })
    }

    render(){
        return (
            <div className="container">
                <div className="post_tabs row-box">
                    {this.state.tabs.map( (v, i)=> 
                        <Tab 
                            key={i}
                            onClick={() => this.handleTabClick(event, v.id)} 
                            name={v.name} 
                            active={v.active} 
                            id={v.id} 
                            title={v.name}
                        />
                    )}
                    <a onClick={ () => this.handleAddTabs() } className="centerAlign"><i title="关闭" className="iconfont">&#xe6b9;</i></a>
                </div>
                <div className="post_card">
                    {this.state.tabs.map( (v, i)=>
                        <Posts 
                            key={i}
                            id={v.id} 
                            active={v.active}
                            posts={v.posts}
                            selectChange={(event, id) => this.selectChange(event, v.id)}
                            textChange={(event, type, id) => this.textChange(event, type, v.id)}
                            jsonBeautify={(id) => this.jsonBeautify(v.id)}
                            sendRequest={(id) => this.sendRequest(v.id)}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default TabCard;
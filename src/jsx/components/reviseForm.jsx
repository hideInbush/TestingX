import React from 'react';
import ReactDOM from 'react-dom';

/*modal-reviseForm*/
class ReviseForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryName: this.props.categoryName
        }
    }

    handleSubmit() {
        alert('submit!');
    }
    handleCloseModal(){
        ReactDOM.unmountComponentAtNode(document.getElementById("modal-revise"));
    }
    handleInputChange(event){
        this.setState({
            categoryName: event.target.value
        })
    }

    render(){
        return (
            <div className='Modal-wrapper'>
                <div className='Modal-backdrop'></div>
                <div className='container'>
                    <div className="title">
                        <label style={{marginLeft:'20px'}}>修改</label>
                        <label className="btn-close" onClick={()=>this.handleCloseModal()}>
                                X
                        </label>
                    </div>
                    <div className='body'>
                        <div className='main'>
                            <label>名字</label>
                            <input type='text' value={this.state.categoryName}
                                onChange={()=>this.handleInputChange()}/>
                        </div>
                        <div className='btn'>
                            <div>
                                <input className="btn-confirm" type="submit" value='确定' 
                                onClick={()=>this.handleSubmit()}/>
                                <input className="btn-cancel" type="button" value='取消' 
                                    onClick={()=>this.handleCloseModal()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReviseForm;
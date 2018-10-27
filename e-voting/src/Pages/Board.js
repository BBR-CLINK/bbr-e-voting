import React, { Component } from 'react';
import 'react-table/react-table.css'
import axios from 'axios';
import request from 'request'

axios.baseURL = 'http://www.eatda.cf:4000';
//axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class Board extends Component {
    constructor(props) {
        super(props);

        this._toCreate = this._toCreate.bind(this);
        this._inputTitle = this._inputTitle.bind(this);
        this._inputCand = this._inputCand.bind(this);
        this._inputCandArr = this._inputCandArr.bind(this);
        this._createSubmit = this._createSubmit.bind(this);
        this._inputTime = this._inputTime.bind(this);
        this._inputDepart = this._inputDepart.bind(this);
        
        this.state = {
            clicked : false,
            title : "",
            depart : "",
            candTemp : "",
            candidate : [],
            end : 0,
            SUT : 0,
            EUT : 0,
            _byteArr : []
        };
    }

    componentDidMount(){
        let pk = this.props.publicKey;
        let _depart = this.props.depart;

        let utf8 = unescape(encodeURIComponent(pk));

        let byteArr = [];
        for (let i = 0; i < utf8.length; i++) {
            byteArr.push(utf8.charCodeAt(i));
        }
        this.setState({
            _byteArr : byteArr
        })
        /*
        axios.get('/user', {
            params: {
                
            }
          })
          .then(function (response) {
            console.log(response);
          })
          */
          
        axios({
            method: 'post',
            headers: {'Access-Control-Allow-Origin': '*',},
            url: 'http://eatda.cf:4000/voteType',
            data: {
                publicKey: byteArr,
                depart: _depart
            }
          }).then((res) => {
            console.log(res);
        });
    }

    _toCreate(){
        this.setState({
            clicked : true
        })
    }

    _inputTitle(e){
        let _title = e.target.value;

        this.setState({
            title : _title
        })
    }

    _inputCand(e){
        let _cand = e.target.value;
        
        this.setState({
            candTemp : _cand
        })
    }

    _inputCandArr(){
        let _candArr = this.state.candidate;
        _candArr.push(this.state.candTemp);

        this.setState({
            candidate : _candArr
        })
    }

    _inputTime(e){
        let _time = e.target.value;

        this.setState({
            end : _time
        })
    }

    _inputDepart(e){
        let _depart = e.target.value;

        this.setState({
            depart : _depart
        })
    }

    _createSubmit(){
        let _title = this.state.title;
        let _candidate = this.state.candidate;
        let _meta = this.state.depart;

        let _end = this.state.end;
        let SDate = Date.now();
        let EDate;
        //let SUnixTime = SDate.getUnixTime();
        //SDate.setDate (SDate.getDate() + _end);
        EDate = SDate;
        //let EUnixTime = EDate.getUnixTime();
        
        /*axios({
            method: 'post',
            headers: {'Access-Control-Allow-Origin': '*',},
            url: 'http://eatda.cf:4000/voteReg',
            data: {
                Name : _title,
                Meta : _meta,
                Candidate : _candidate,
                //S_timestamp : SUnixTime,
                //E_timestamp : EUnixTime,
            }
          }).then((res) => {
            console.log(res);
        });*/
        
        alert(`Name : 총학생회 투표 \n Meta : 총학생회 \n Sstamp : 1540512000 \n Estamp : 1540857600 \n candidate : [1,2,3]`);
        
        this.setState({
            title : "",
            candidate : [],
            clicked : false,
        })
    }

    render() {
        if(this.state.clicked === false){
            return(
                <div>
                    <p className="h3" style={{position: "absolute", left: 410, top: 120}} >Hello It's Board</p> 
                    <p className="h3" style={{position: "absolute", left: 410, top: 180}}>{this.props.publicKey}</p>
                    <p className="h3" style={{position: "absolute", left: 410, top: 270}} >This is your Voting List</p>
                    <div className="h3" style={{position: "absolute", left: 410, top: 350}}>
                        <VoteList byteArr={this.state._byteArr} />
                    </div>
                    <p><input type="button" className= "btn btn-option btn-sm" style={{position: "absolute", left: 1100, top: 130}} value="Create Vote" onClick={this._toCreate} required/></p>
                </div>
            )
        } else if(this.state.clicked === true) {
            return(
                <div>
                    <p className="h3" style={{position: "absolute", left: 370, top: 120}}>Create Page</p>
                    <input type="text" className="form-control" placeholder="Vote Title" onChange={(e)=>{this._inputTitle(e)}} style={{position: "absolute", left: 360, top: 200}} />
                    <input type="text" className="form-control" placeholder="Depart" onChange={this._inputDepart} style={{position: "absolute", left: 360, top: 270}}/>
                    <input type="text" className="form-control" placeholder="mmdd/mmdd" onChange={this._inputDepart} style={{position: "absolute", left: 360, top: 340}}/>
                    <input type="text" placeholder="new cadidate" onChange={this._inputCand} className= "form-control" style={{position: "absolute", left: 360, top: 380}} />
                    <input type="button" style={{position: "absolute", left: 810, top: 290}} className= "btn btn-option btn-lg" value="   ADD   " onClick={this._inputCandArr}/>
                    <p style={{position: "absolute", left: 365, top: 420}} >
                        {this.state.candidate.map((cand) =>
                            <li className="h3" key={cand}>{cand}</li> 
                        )}
                    </p>
                    <p>
                        <input type="button" style={{position: "absolute", left: 810, top: 220}} className= "btn btn-option btn-lg" value="Create!" onClick={this._createSubmit}/>
                    </p>
                </div>
            )
        }
    }
}

class VoteList extends Component {
    constructor(props){
        super(props);
        this._chong = this._chong.bind(this);
        this._gong = this._gong.bind(this);
        this._onClick = this._onClick.bind(this);

        this.state = {
            chong : false,
            gong : false
        }
    }

    _chong(){
        this.setState({
            chong : true,
            gong : false
        })
    }

    _gong(){
        this.setState({
            chong : false,
            gong : true
        })
    }

    _onClick(){
        let byar = this.props.byteArr;
        alert(`your vote : 총학생회 \n you chose 1 \n your byteArr : ${byar}`);
        this.setState({
            chong : false,
            gong : false
        })
    }

    render(){
        if(this.state.chong === false && this.state.gong === false){
        return(
                <div>
                    <div>
                        ** 공과대학 선거 목록 **
                    </div>
                    <input type="button" value=" 총학생회장 투표 " onClick={this._chong}/>
                    <input type="button" value=" 공과대학 학생회장 투표 " onClick={this._gong}/>
                </div>
            )
        } else if(this.state.chong === true && this.state.gong === false){
            return(
                <div>
                    <p>총학생회장 투표</p>
                    <p>token == 1</p>
                    1 : <input type="checkbox" label="1번"/>
                    2 : <input type="checkbox" label="2번"/>
                    3 : <input type="checkbox" label="3번"/>
                    <input type="button" value="submit" onClick={this._onClick}/>
                </div>
            )
        } else if(this.state.chong === false && this.state.gong === true){
            return(
                <div>
                    <p>공과대학 학생회장 투표</p>
                    1 : <input type="checkbox" label="1번"/>
                    2 : <input type="checkbox" label="2번"/>
                    <input type="button" value="submit"/>
                </div>
            )
        }
    }
}

export default Board;
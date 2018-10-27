import React, { Component } from 'react';
import 'react-table/react-table.css'
import axios from 'axios';

class Board extends Component {
    constructor(props) {
        super(props);

        this._toCreate = this._toCreate.bind(this);
        this._inputTitle = this._inputTitle.bind(this);
        this._inputCand = this._inputCand.bind(this);
        this._inputCandArr = this._inputCandArr.bind(this);
        this._createSubmit = this._createSubmit.bind(this);
        this._inputTime = this._inputTime.bind(this);
        
        this.state = {
            clicked : false,
            title : "",
            depart : "",
            candTemp : "",
            candidate : [],
            end : 0,
            SUT : 0,
            EUT : 0,
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

        axios({
            method: 'post',
            url: 'www.eatda.cf',
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
        let SUnixTime = SDate.getUnixTime();
        SDate.setDate (SDate.getDate() + _end);
        EDate = SDate;
        let EUnixTime = EDate.getUnixTime();

        axios({
            method: 'post',
            url: 'http://www.eatda.cf/voteReg',
            data: {
              Name : _title,
              Meta : _meta,
              Candidate : _candidate,
              S_timestamp : SUnixTime,
              E_timestamp : EUnixTime,
            }
          }).then((res) => {
            console.log(res);
        });
        
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
                        List
                    </div>
                    <p><input type="button" className= "btn btn-option btn-sm" style={{position: "absolute", left: 1100, top: 130}} value="Create Vote" onClick={this._toCreate} required/></p>
                </div>
            )
        } else if(this.state.clicked === true) {
            return(
                <div>
                    <p className="h3" style={{position: "absolute", left: 370, top: 120}}>Create Page</p>
                    <input type="text" className="form-control" placeholder="Vote Title" onChange={(e)=>{this._inputTitle(e)}} style={{position: "absolute", left: 360, top: 220}} />
                    <input type="text" placeholder="Depart" onChange={this._inputDepart}/>
                    <input type="text" placeholder="new cadidate" onChange={this._inputCand} className= "form-control" style={{position: "absolute", left: 360, top: 290}} />
                    <input type="button" style={{position: "absolute", left: 810, top: 290}} className= "btn btn-option btn-lg" value="   ADD   " onClick={this._inputCandArr}/>
                    <p style={{position: "absolute", left: 365, top: 390}} >
                        {this.state.candidate.map((cand) =>
                            <li className="h3" key={cand}>{cand}</li> 
                        )}
                    </p>
                    <p>
                        <input type="number" placeholder="how days far off?" onChange={this._inputTime}/>
                    </p>
                    <p>
                        <input type="button" style={{position: "absolute", left: 810, top: 220}} className= "btn btn-option btn-lg" value="Create!" onClick={this._createSubmit}/>
                    </p>
                </div>
            )
        }
    }
}

export default Board;
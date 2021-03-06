import React, {Component} from 'react'
import {connect} from 'react-redux'

import {loginUser} from "../../store/actions/authActions";
import {clearErrors} from "../../store/actions/errorActions";

export class Login extends Component{
    state = {
        email: '',
        password: ''
    }

    componentDidUpdate(){
        if(this.props.user){
            this.props.history.push("/")
        }
    }

    componentDidMount(){
        this.props.clearErrors()
        if(this.props.user){
            this.props.history.push("/")
        }
    }



    onChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit = e => {
        e.preventDefault();

        this.props.loginUser(this.state)

    }

    render(){
        const {errors} = this.props;
        const {email,password} = this.state;
        return(
            <div className="row">
                <form
                    action=""
                    className="card p-3 mx-auto col-md-6"
                    onSubmit={this.onSubmit}
                >
                  <h2>Enter</h2>
                  <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={this.onChange}
                          name="email"
                      />
                      {errors.email && (<div className="text-danger">{errors.email}</div>)}
                  </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={this.onChange}
                            name="password"
                        />
                        {errors.password && (<div className="text-danger">{errors.password}</div>)}
                    </div>

                    <button className="btn btn-primary btn-lg">Enter</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    errors: state.errorReducer
})

export default connect(mapStateToProps,{loginUser,clearErrors})(Login)
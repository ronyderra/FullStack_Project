import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component<any> {

    componentDidMount(){
        this.props.showLogout()
    }

    render() {
        let isAuthenticated
        const Component = this.props.component;
        if (sessionStorage.getItem("isAdmin") === "1") {
            isAuthenticated = true;
        } else {
            isAuthenticated = false;
        }
        
        return isAuthenticated ? (
            <Component {...this.props} />
        ) : (
                <Redirect to={{ pathname: '/login' }} />
            );
    }
}

export default ProtectedRoute;
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/User/Login.js';
import SubRoutes from './utils/SubRoutes.js'
import {RouteConfig} from './routes/common/router.js'
//私有路由开关
const isAuthority=true;


function RouterConfig({ history ,app}) {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={ Login} /> */}
         { RouteConfig.map((route,index)=>(
            <SubRoutes key={index} {...route} app={app}/>
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;

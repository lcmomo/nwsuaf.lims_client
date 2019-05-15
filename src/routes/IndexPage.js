import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.scss';

import {Switch} from 'dva/router';


import SubRoutes,{RedirectRoute,NoMatchRoute} from '../utils/SubRoutes.js'
function IndexPage(props) {

  const {routes,app}=props;
  return (
    <div className={styles.normal}>
      {/* 一级路由 */}
      <Switch>
         { routes.map((route,index)=>(
            <SubRoutes key={index} {...route} app={app}/>
        ))}
           {/* //<Redirect to="/home"></Redirect> */}
           <RedirectRoute exact={true} from={'/'} routes={routes}/>
             {/* 输入的链接不存在时,跳转到NoMatch组件中 */}
              <NoMatchRoute />
         </Switch>
     
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);

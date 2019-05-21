// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']

import  pathToRegexp from 'path-to-regexp';
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}


export function getPathParams(urlpattern,pathname){
  const match=pathToRegexp(urlpattern).exec(pathname);
  return match;
}

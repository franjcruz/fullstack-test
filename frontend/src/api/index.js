import _ from 'lodash';

function urlWithParams(url, params) {
  if (params) {
    const urlParams = url.match(/{param}/g) || [];
    if (params instanceof Array) {
      params.forEach((value, index) => {
        if (index < _.size(urlParams)) {
          url = _.replace(url, '{param}', value);
        } else {
          url = `${url}/${value}`;
        }
      });
    } else {
      if (_.size(urlParams)) {
        url = _.replace(url, '{param}', params);
      } else {
        url = `${url}/${params}`;
      }
    }
  }
  return url;
}

export const apiGet = (url, params) => () => {
  return fetch(urlWithParams(url, params), {
    headers: localStorage.getItem('jwtToken')
      ? new Headers({ 'Content-type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('jwtToken') })
      : new Headers({ 'Content-type': 'application/json' })
  })
    .then(v => {
      return v.json();
    })
    .then(r => {
      if (r.error) {
        return Promise.reject(r.error);
      }
      return (r = r.data);
    });
};

export const apiPost = (url, obj, params) => () => {
  return fetch(urlWithParams(url, params), {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: localStorage.getItem('jwtToken')
      ? new Headers({
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        })
      : new Headers({ 'Content-type': 'application/json' })
  })
    .then(v => {
      return v.json();
    })
    .then(r => {
      if (r.error) {
        return Promise.reject(r.error);
      }
      return (r = r.data);
    });
};

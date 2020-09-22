const url = require('url');

module.exports = (req, res, next)=> {
    let url_parts = url.parse(req.get('referer'));
    console.log(url_parts)
    const redirectTo = url_parts.href;
    req.session.redirectTo = redirectTo ;
    next();
}
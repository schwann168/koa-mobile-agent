/**
 * middleware for koa to map the mobile route with user-agent
 *
 * Authors:
 *  Schwann <codegarden@foxmail.com>
 */

'use strict';

module.exports = function (options) {

    const routes = options.routes || [];
    const status = options.status || 301;

    return function * agent(next) {

        if (!routes || routes.length == 0 || !checkUserAgent(this)) {
            return yield * next;
        }

        const path = this.request.path;
        let targetUrl = null;

        for (let i = 0; i < routes.length; i++) {
            if (routes[i].path.toLowerCase() == path.toLowerCase()) {
                targetUrl = routes[i].target;
                break;
            }
        }

        if (targetUrl) {
            this.status = status;
            this.redirect(targetUrl);
            return;
        }

        return yield * next;
    };

    /**
     * check mobile with user-agent
     */
    function checkUserAgent(ctx) {
        const userAgent = ctx.headers['user-agent'];
        if (userAgent)
            return userAgent.match(/(iphone|ipod|ipad|android|phone|pad|pod|mobile)/ig);
        return false;
    }

};
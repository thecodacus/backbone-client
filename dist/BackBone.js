import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { BBConnection } from './BBConnection';
import { RequestTranslator } from './RequestTranslator';
import { share } from 'rxjs/operators';
var BackBone = /** @class */ (function () {
    function BackBone() {
    }
    BackBone.prototype.connect = function (config) {
        var _this = this;
        this.config = config;
        var ob = new Observable(function (observer) {
            _this.socket = io(_this.config.hostname + ":" + _this.config.port + "/" + _this.config.namespace);
            _this.socket.on('connect', function () {
                console.log("connection established!!");
                _this.socket.emit('init', { token: _this.config.AuthToken }, function (err, result) {
                    if (err) {
                        _this.socket.disconnect();
                        observer.error(err);
                        observer.complete();
                        console.log(err);
                        return;
                    }
                    else {
                        observer.next(new BBConnection(_this.socket, _this.token));
                        return;
                    }
                });
            });
        }).pipe(share());
        return ob;
    };
    BackBone.prototype.setToken = function (token) {
        var _this = this;
        this.token = token;
        if (this.conn) {
            this.conn.subscribe(function (conn) {
                conn.setToken(_this.token);
            });
        }
    };
    BackBone.prototype.createRequest = function () {
        return new RequestTranslator();
    };
    return BackBone;
}());
export { BackBone };
//# sourceMappingURL=BackBone.js.map
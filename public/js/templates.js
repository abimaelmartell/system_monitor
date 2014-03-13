this["JST"] = this["JST"] || {};

this["JST"]["templates/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section class="row mini-boxes">\n    <div class="col-sm-3">\n        <div class="stat-resume">\n            <h4>' +
((__t = ( stats.memory.used_percent )) == null ? '' : __t) +
'% <small>RAM Usage</small></h4>\n        </div>\n    </div>\n    <div class="col-sm-3">\n        <div class="stat-resume">\n            <h4>' +
((__t = ( stats.disk_usage_percent )) == null ? '' : __t) +
'% <small>Disk Usage</small></h4>\n        </div>\n    </div>\n    <div class="col-sm-3">\n        <div class="stat-resume">\n            <h4>' +
((__t = ( stats.cpu_usage_percent )) == null ? '' : __t) +
'% <small>CPU Usage</small></h4>\n        </div>\n    </div>\n    <div class="col-sm-3">\n        <div class="stat-resume load-average">\n            <h4>' +
((__t = ( stats.load_average[0].percent )) == null ? '' : __t) +
'% <small>Load Average</small></h4>\n        </div>\n    </div>\n</section>\n\n<section class="row">\n    <div class="col-sm-8">\n        <div class="box">\n            <h3>System Information</h3>\n            <h4>Processor: <span class="text-muted">' +
((__t = ( stats.cpu.vendor + " " + stats.cpu.model )) == null ? '' : __t) +
'</span></h4>\n            <h4>Uptime: <span class="text-muted">' +
((__t = ( stats.uptime_string )) == null ? '' : __t) +
'</span></h4>\n            <h4>Operative System: <span class="text-muted">' +
((__t = ( stats.system_info.name + " " + stats.system_info.version + " " + stats.system_info.description + " " + stats.system_info.arch )) == null ? '' : __t) +
'</span></h4>\n\n            <h3>Network Information <small> Default interface ' +
((__t = ( stats.network_info.default_gateway_interface )) == null ? '' : __t) +
'</small></h3>\n            <h4>Host Name: <span class="text-muted">' +
((__t = ( stats.network_info.host_name )) == null ? '' : __t) +
'</span></h4>\n            <h4>Default Gateway: <span class="text-muted">' +
((__t = ( stats.network_info.default_gateway )) == null ? '' : __t) +
'</span></h4>\n            <h4>Primary DNS: <span class="text-muted">' +
((__t = ( stats.network_info.primary_dns )) == null ? '' : __t) +
'</span></h4>\n        </div>\n    </div>\n    <div class="col-sm-4">\n        <div class="box">\n            <h3>RAM Information</h3>\n            <h4>Total: ' +
((__t = ( stats.memory.total )) == null ? '' : __t) +
' MB</h4>\n            <h4>Used: ' +
((__t = ( App.Utils.convertBytes(stats.memory.used) )) == null ? '' : __t) +
'</h4>\n            <h4>Free: ' +
((__t = ( App.Utils.convertBytes(stats.memory.free) )) == null ? '' : __t) +
'</h4>\n\n            <h3>Load Average</h3>\n            <h4>' +
((__t = ( stats.load_average[0].load + " &raquo; " + stats.load_average[0].percent + "%" )) == null ? '' : __t) +
' <small>last minute</small></h4>\n            <h4>' +
((__t = ( stats.load_average[1].load + " &raquo; " + stats.load_average[1].percent + "%" )) == null ? '' : __t) +
' <small>last 5 minutes</small></h4>\n            <h4>' +
((__t = ( stats.load_average[2].load + " &raquo; " + stats.load_average[2].percent + "%" )) == null ? '' : __t) +
' <small>last 15 minutes</small></h4>\n        </div>\n    </div>\n</section>\n\n<section class="box">\n    <h3>CPU\'s</h3>\n    <table class="table table-hover table-striped" id="cpus-table">\n        <thead>\n            <tr>\n                <th>#</th>\n                <th>User</th>\n                <th>System</th>\n                <th>Nice</th>\n                <th>Idle</th>\n                <th>Wait</th>\n                <th>IRQ</th>\n                <th>Soft IRQ</th>\n                <th>Stolen</th>\n                <th>Total</th>\n            </tr>\n        </thead>\n        <tbody>\n        ';
 _.each(stats.cpu.cores, function(core, i){ ;
__p += '\n        <tr>\n            <td>' +
((__t = ( i + 1 )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( core.user )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( core.sys )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( core.nice )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( core.idle )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( core.wait )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( core.irq )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( core.soft_irq )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( core.stolen )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( core.total )) == null ? '' : __t) +
'</td>\n        </tr>\n        ';
 }) ;
__p += '\n        </tbody>\n    </table>\n</section>\n\n<section class="box">\n    <h3>File Systems</h3>\n    <table class="table table-hover table-striped" id="file-systems-table">\n        <thead>\n            <tr>\n                <th>Dir</th>\n                <th>Dev</th>\n                <th>Type</th>\n                <th>Usage Percent</th>\n                <th>Total</th>\n                <th>Free</th>\n                <th>Used</th>\n                <th>Available</th>\n                <th>Files</th>\n            </tr>\n        </thead>\n        <tbody>\n        ';
 _.each(stats.file_systems, function(file_system){ ;
__p += '\n        <tr>\n            <td>' +
((__t = ( file_system.dir )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( file_system.dev )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( file_system.type )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( (file_system.usage.use_percent * 100).toFixed(2) )) == null ? '' : __t) +
' %</td>\n            <td>' +
((__t = ( file_system.usage.total )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( file_system.usage.free )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( file_system.usage.used )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( file_system.usage.available )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( file_system.usage.files )) == null ? '' : __t) +
'</td>\n        </tr>\n        ';
 }) ;
__p += '\n        </tbody>\n    </table>\n</section>\n\n<section class="box">\n    <h1>Processes</h1>\n    <table class="table table-hover table-striped" id="processes-table">\n        <thead>\n            <tr>\n                <th>PID</th>\n                <th>Process Name</th>\n                <th>CPU %</th>\n                <th>Memory</th>\n                <th>User</th>\n                <th>Threads</th>\n                <th>State</th>\n            </tr>\n        </thead>\n        <tbody>\n        ';
 _.each(stats.processes, function(process){ ;
__p += '\n        <tr>\n            <td>' +
((__t = ( process.pid )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( process.name )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( process.cpu.percent )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( process.memory.resident )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( process.user )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( process.threads )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( process.state )) == null ? '' : __t) +
'</td>\n        </tr>\n        ';
 }) ;
__p += '\n        </tbody>\n    </table>\n</section>\n\n<section class="box">\n    <h1>Network Interfaces</h1>\n    <table class="table table-hover table-striped" id="network-interfaces-table">\n        <thead>\n            <tr>\n                <th>Name</th>\n                <th>Type</th>\n                <th>IP Address</th>\n                <th>MAC Address</th>\n                <th>Speed</th>\n                <th>Transmitted</th>\n                <th>Received</th>\n                <th>Transmitted Packets</th>\n                <th>Received Packets</th>\n            </tr>\n        </thead>\n        <tbody>\n        ';
 _.each(stats.network_interfaces, function(network_interface){ ;
__p += '\n        <tr>\n            <td>' +
((__t = ( network_interface.name )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( network_interface.type )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( network_interface.address.ip )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( network_interface.address.mac )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( network_interface.stat.speed )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( network_interface.stat.rx_bytes )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( network_interface.stat.tx_bytes )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( network_interface.stat.rx_packets )) == null ? '' : __t) +
'</td>\n            <td>' +
((__t = ( network_interface.stat.tx_packets )) == null ? '' : __t) +
'</td>\n        </tr>\n        ';
 }) ;
__p += '\n        </tbody>\n    </table>\n</section>\n';

}
return __p
};

this["JST"]["templates/process.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal fade" id="process-modal">\n    <div class="modal-dialog modal-lg">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n                <h4 class="modal-title">Process ' +
((__t = ( process.pid )) == null ? '' : __t) +
'</h4>\n            </div>\n            <div class="modal-body">\n                <table class="table table-hover table-striped">\n                    <tr>\n                        <td>Name</td>\n                        <td>' +
((__t = ( process.name )) == null ? '' : __t) +
'</td>\n                    </tr>\n                    <tr>\n                        <td>User</td>\n                        <td>' +
((__t = ( process.user )) == null ? '' : __t) +
'</td>\n                    </tr>\n                    <tr>\n                        <td>Group</td>\n                        <td>' +
((__t = ( process.group )) == null ? '' : __t) +
'</td>\n                    </tr>\n                    <tr>\n                        <td>State</td>\n                        <td>' +
((__t = ( process.state )) == null ? '' : __t) +
'</td>\n                    </tr>\n                    <tr>\n                        <td>PID</td>\n                        <td>' +
((__t = ( process.pid )) == null ? '' : __t) +
'</td>\n                    </tr>\n                    <tr>\n                        <td>Arguments</td>\n                        <td>\n                            <pre>';
 _.each(process.arguments, function(arg) { ;
__p +=
((__t = ( arg + "\n" )) == null ? '' : __t);
 }); ;
__p += '</pre>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>Command</td>\n                        <td><pre>' +
((__t = ( process.exe.name )) == null ? '' : __t) +
'</pre></td>\n                    </tr>\n                    <tr>\n                        <td>CWD (<a href="http://en.wikipedia.org/wiki/Working_directory" target="_blank" title="Current Working Directory">?</a>)</td>\n                        <td><pre>' +
((__t = ( process.exe.cwd )) == null ? '' : __t) +
'</pre></td>\n                    </tr>\n                </table>\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n            </div>\n        </div>\n    </div>\n</div>\n';

}
return __p
};
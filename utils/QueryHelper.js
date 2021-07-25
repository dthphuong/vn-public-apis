/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const _ = require('underscore'),
    IO = require('./IO');
var async = require('async');
var pdf = require('html5-to-pdf');



exports.checkPermission = function (userPermission, objPermission) {
    userPermission = _.sortBy(userPermission).toString().replace(/,/g, '')
    objPermission = _.sortBy(objPermission).toString().replace(/,/g, '')

    // console.log(userPermission);
    // console.log(objPermission);
    // console.log('----------------');

    var result = IO.longestCommonSubstring(userPermission, objPermission)
    if (result.length >= 24 && result.length % 24 >= 0) {
        return true
    } else {
        return false
    }
}
exports.removehtml = function strip_html_tags(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/<[^>]*>|\r&\n|\r\n/g, '');
}

exports.replaceHTML = function (List) {
    var htmlText = ''
    for (var i = 0; i < List.length; i++) {
        htmlText += '<tr><th colspan=6 style=text-align:left>' + List[i].rldvLv1 + '</th></tr>'
        for (var j = 0; j < List[i].childs.length; j++) {
            htmlText += '<tr><td rowspan=' + (List[i].childs[j].rldvData.length + 1) + '>' + (j + 1) + '</td>' + '<td rowspan=' + (List[i].childs[j].rldvData.length + 1) + '>' + List[i].childs[j].rldvLv2 + '</td></tr>'
            for (var k = 0; k < List[i].childs[j].rldvData.length; k++) {
                htmlText += '<tr><td>' + List[i].childs[j].rldvData[k].content + '</td><td>' + List[i].childs[j].rldvData[k].maxScore + '</td>' + '<td>' + List[i].childs[j].rldvData[k].score + '</td>' + '<td>' + List[i].childs[j].rldvData[k].verifyScore + '</td></tr>'
            }
        }
    }
    return htmlText
}
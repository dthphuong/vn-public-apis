/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

var fs = require('fs');
const HTML5ToPDF = require('html5-to-pdf');
const path = require('path');

const {
    exec
} = require('child_process');

//#region Upper Title case
exports.toProperCase = (str) => {
    return str.replace(
        /(^|[\s\xA0])[^\s\xA0]/g,
        function (txt) {
            return txt.toUpperCase();
        }
    );
}

exports.toProperCase2 = (str) => {
    return str.replace(
        /(^|[\s\xA0])[^\s\xA0]/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
//#endregion

//#region Find the Longest Common Substring
exports.longestCommonSubstring = (str1, str2) => {
    if (!str1 || !str2) {
        return {
            length: 0,
            sequence: '',
            offset: 0
        }
    }

    var sequence = ''
    var str1Length = str1.length
    var str2Length = str2.length
    var num = new Array(str1Length)
    var maxlen = 0
    var lastSubsBegin = 0

    for (var i = 0; i < str1Length; i++) {
        var subArray = new Array(str2Length)
        for (var j = 0; j < str2Length; j++) {
            subArray[j] = 0
        }
        num[i] = subArray
    }
    var thisSubsBegin = null
    for (i = 0; i < str1Length; i++) {
        for (j = 0; j < str2Length; j++) {
            if (str1[i] !== str2[j]) {
                num[i][j] = 0
            } else {
                if ((i === 0) || (j === 0)) {
                    num[i][j] = 1
                } else {
                    num[i][j] = 1 + num[i - 1][j - 1]
                }

                if (num[i][j] > maxlen) {
                    maxlen = num[i][j]
                    thisSubsBegin = i - num[i][j] + 1
                    if (lastSubsBegin === thisSubsBegin) { // if the current LCS is the same as the last time this block ran
                        sequence += str1[i]
                    } else { // this block resets the string builder if a different LCS is found
                        lastSubsBegin = thisSubsBegin
                        sequence = '' // clear it
                        sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin)
                    }
                }
            }
        }
    }
    return {
        length: maxlen,
        sequence: sequence,
        offset: thisSubsBegin
    }
}
//#endregion

exports.mergeObjects = function (obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }
    return obj3;
}

exports.exportToPDF = async (filename, htmlData) => {
    const html5ToPDF = new HTML5ToPDF({
        inputBody: htmlData,
        outputPath: path.join(__dirname, '..', 'pdf-file', filename),
        // templatePath: path.join(__dirname, "templates", "basic"),
        include: [
            path.join(__dirname, '..', 'email-template', 'css', 'bootstrap.min.css'),
            path.join(__dirname, '..', 'email-template', 'css', 'paper.min.css'),
            path.join(__dirname, '..', 'email-template', 'css', 'paper-custom.css'),
        ],
        launchOptions: {
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
        // launchOptions: { headless: false }
    });

    await html5ToPDF.start().catch(err => console.error(err));
    await html5ToPDF.build().catch(err => console.error(err));
    await html5ToPDF.close().catch(err => console.error(err));
    console.log("DONE: export pdf file");
};

exports.execute = async (commands1, commands2) => {
    await exec(commands1, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(stdout, stderr)
        }
    });
    await exec(commands2, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(stdout, stderr)
        }
    });
}
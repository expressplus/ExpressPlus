// author: Ulvi Memmedov
'use strict';

const Global = {};


const SetGlobal = (key,value) =>{

    Global[`${key}`] = value

};

const DeleteGlobal = (key) =>{

    delete Global[`${key}`]

}

module.exports = {Global,SetGlobal,DeleteGlobal};
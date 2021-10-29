import React from 'react'
import { useState, useEffect } from 'react';
import { TablePane } from './table-pane';
import { SearchPane } from "./search-pane";
import { cleanObject, useDebounce, useMount } from 'utils';
import qs from 'qs';//npm i --save-dev @types/qs  
/*  .d.ts补丁 说明书文件
   将js转换为js文件 */

const baseUrl = process.env.REACT_APP_API_URL;
export const ScreenPane = () => {
    /* 状态提升 */
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    /* 初始化请求存放处 */
    useMount(() => {
        fetch(`${baseUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })
    // useEffect(() => {
    //     fetch(`${baseUrl}/users`).then(async (response) => {
    //         if (response.ok) {
    //             setUsers(await response.json())
    //         }
    //     })
    // }, [])
    /* 项目列表LIST 防抖后的param变为debounceParam   当debounceParam变化的时候执行请求*/
    const debounceParam = useDebounce(param, 50)
    useEffect(() => {
        fetch(`${baseUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async (response) => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debounceParam])
    return <div>
        <SearchPane param={param} setParam={setParam} users={users}></SearchPane>
        <TablePane list={list} users={users}></TablePane>
    </div>
}

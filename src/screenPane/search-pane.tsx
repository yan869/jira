import React from 'react'
import { useState, useEffect } from 'react';
// 导出,其他的页面需要使用的时候
export interface User {
    id: string;
    name: string;
}
interface searchProps {
    param: {
        name: string;
        personId: string
    },
    setParam: (param: searchProps['param']) => void,
    users: User[]
}
export const SearchPane = ({ param, setParam, users }: searchProps) => {
    return <form >
        <input type="text" value={param.name} onChange={(e) => setParam({
            ...param,
            name: e.target.value
        })} />
        <select value={param.personId} onChange={(e) => {
            setParam({
                ...param,
                personId: e.target.value
            })
        }}>
            <option value={""}>负责人</option>
            {
                users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)
            }
        </select>
    </form>
}
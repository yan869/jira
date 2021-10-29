import React from 'react';
import { User } from './search-pane';
interface List {
    id: string;
    personId: string;
    name: string;
}
interface tableParam {
    list: List[],
    users: User[]
}
export const TablePane = ({ list, users }: tableParam) => {
    return <table>
        <thead>
            <tr>
                <th>项目名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {list.map(project =>
                <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{users.find(user => {
                        return user.id == project.personId
                    })?.name || '未知'}</td>
                </tr>
            )}
        </tbody>
    </table>
}

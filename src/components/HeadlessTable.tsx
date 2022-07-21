import React from 'react'

interface IHeadlessTable {
    items: {
        [key: string]: string;
    }
}

const HeadlessTable = (props: IHeadlessTable) => (
    <table className='footer-headless-table'>
        <tbody>
            {props.items && Object.entries(props.items).map(x => 
                <tr>
                    <td><a href={x[0]}>{x[0]}</a></td>
                    <td>{x[1]}</td>
                </tr>
            )}
        </tbody>
    </table>
)

export default HeadlessTable
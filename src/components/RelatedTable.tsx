import React from 'react'

interface IRelatedTable {
    items: {
        [key: string]: string;
    }
}

const RelatedTable = (props: IRelatedTable) => (
    <table className='footer-related-table'>
        <thead>
            <tr>
                <th>Related</th>
                <th>Description</th>
            </tr>
        </thead>
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

export default RelatedTable
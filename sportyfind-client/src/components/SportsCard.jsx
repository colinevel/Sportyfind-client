import React from 'react'

export default function SportsCard({sport}) {
    return (
        <div>
            <title>{sport.name}</title>
            <img src={sport.image} alt="something"/>
        </div>
    )
}

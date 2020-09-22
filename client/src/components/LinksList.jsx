import React from "react";
import { Link } from "react-router-dom";


export const LinksList = ({ links }) => {
    // if (!links.length) {
    //     return <p className="center">ой... кажется тут ничего нет...</p>
    // }
    return (
        <div>{
            links.map((link, index) => {
                return (
                    <div className="row" key={link._id}>
                        <div className="col s12 m6">
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">{index + 1}. Ссылка</span>
                                    <p>{link.from}</p>
                                </div>
                                <div className="card-action">
                                    <Link to={`/detail/${link._id}`}>Подробнее...</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }</div>
    )
}
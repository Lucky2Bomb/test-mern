import React from "react";

export const LinkCard = ({ link, goto }) => {
    // return (
    //     <>
    //         <h2>Ссылка</h2>
    //         <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
    //         <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
    //         <p>Кол-во кликов: {link.clicks}</p>
    // <p>Дата создания {new Date(link.date).toLocaleDateString()}</p>
    //     </>
    // )

    return (
        <div class="card">

            <div class="card-content" style={{ height: 200 }}>
                <span class="card-title activator grey-text text-darken-4">Ссылка<i class="material-icons right">&#8595;</i></span>
                <p><a href={link.from}>{link.from}</a></p>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Подробности<i class="material-icons right">&#215;</i></span>
                <ol>
                    <li>Количество кликов: {link.clicks}</li>
                    <li>Дата создания: {new Date(link.date).toLocaleDateString()}</li>
                    <li>Откуда: <a href={link.to}>{link.to}</a></li>
                </ol>
            </div>
        </div>
    );
}
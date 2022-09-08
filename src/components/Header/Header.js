import React, { useEffect, useState } from "react";
const axios = require("axios");

const options = {
    method: 'GET',
    url: 'https://cricket-live-scores4.p.rapidapi.com/api/matches/current',
    headers: {
        'X-RapidAPI-Key': '4a3f924f0emsh02de14b912a18e4p101f05jsnce23894ededd',
        'X-RapidAPI-Host': 'cricket-live-scores4.p.rapidapi.com'
    }
};

//GET NEWS
const newsOption = {
    method: 'GET',
    url: 'https://t20-cricket-news.p.rapidapi.com/news',
    headers: {
        'X-RapidAPI-Key': '4a3f924f0emsh02de14b912a18e4p101f05jsnce23894ededd',
        'X-RapidAPI-Host': 't20-cricket-news.p.rapidapi.com'
    }
};

const Header = () => {
    const [allData, setAllData] = useState();
    const [initialData, setInitialData] = useState();
    const [data, setData] = useState();

    const [allNews, setAllNews] = useState();

    const filterResult = () => {
        console.log("FROM FILTER: ",sessionStorage.getItem('type'), sessionStorage.getItem('isInternational'))
    
        if (sessionStorage.getItem('isInternational') == "domestic") {
            const result =
                allData.filter(match =>
                    match.format == sessionStorage.getItem('type') &&
                    match.internationalClassId == null
                );
            setData(result)
        } else if (sessionStorage.getItem('isInternational') == "international") {
            const result =
                allData.filter(match =>
                    match.format == sessionStorage.getItem('type') &&
                    match.internationalClassId !== null
                );
            setData(result)
        }
    }

    useEffect(() => {
        axios.request(options).then(function (response) {
            setAllData(response.data.data.matches);

            const result = response.data.data.matches.filter(match =>
                match.internationalClassId !== null
            );
            setInitialData(result);

        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    useEffect(() => {
        axios.request(newsOption).then(function (response) {
            setAllNews(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    const handleLoading = (type, isInternational) => {
        sessionStorage.setItem('type', type);
        sessionStorage.setItem('isInternational', isInternational);
        filterResult()
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container">
                    <a class="navbar-brand" href="#">Cric X</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    T20
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onClick={() => handleLoading("T20", "international")}>International</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={() => handleLoading("T20", "domestic")}>Domestic</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ODI
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onClick={() => handleLoading("ODI", "international")}>International</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={() => handleLoading("ODI", "domestic")}>Domestic</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Test
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onClick={() => handleLoading("TEST", "international")}>International</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={() => handleLoading("TEST", "domestic")}>Domestic</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <h1>{data?.length}</h1>

                
                    {data ? data?.map((match) => {
                        return (
                            <div className="col-md-3 match_card">
                                <p>Format: {match.format}</p>
                                <p>{match.ground?.smallName}</p>
                                <p>{match.series?.slug}</p>
                                <p>{match.title}</p>
                                <p>{match.statusText}</p>
                                <p>{match.teams[0]?.team?.name}: {match.teams[0]?.score} {match.teams[0]?.scoreInfo}</p>
                                <p>{match.teams[1]?.team?.name}: {match.teams[1]?.score} {match.teams[1]?.scoreInfo}</p>
                            </div>
                        )
                    })
                        :
                        initialData?.map((match) => {
                            return (
                                <div className="col-md-3 match_card">
                                    <p>Format: {match.format}</p>
                                    <p>{match.ground?.smallName}</p>
                                    <p>{match.series?.slug}</p>
                                    <p>{match.title}</p>
                                    <p>{match.statusText}</p>
                                    <p>{match.teams[0]?.team?.name}: {match.teams[0]?.score} {match.teams[0]?.scoreInfo}</p>
                                    <p>{match.teams[1]?.team?.name}: {match.teams[1]?.score} {match.teams[1]?.scoreInfo}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <h1>{allNews?.length}</h1>
                <div className="row">
                    {
                        allNews?.map((news) => {
                            return (
                                <div className="col-md-4">
                                    <div className="news_card">
                                        <p>{news.title}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Header;
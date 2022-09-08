import React, { useEffect, useState } from "react";
import spinner from '../../images/spinner.gif';

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

    const filterResult = (type) => {
        const result =
            allData.filter(match =>
                match.format === type &&
                match.internationalClassId !== null
            );
        setData(result)
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

    const home = () => {
        setData("")
    }

    return (
        <div className="body">
            <nav class="navbar navbar-expand-lg">
                <div class="container header">
                    <a class="logo" href="#" onClick={home}>CricX</a>
                    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="menu">menu</span>
                            </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="#" onClick={home}>Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" onClick={() => filterResult("T20")}>T20</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" onClick={() => filterResult("ODI")}>ODI</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" onClick={() => filterResult("TEST")}>Test</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {
                ((data || initialData) && allNews) ? <div className="container content">
                    <div className="row">
                        <h6 className="title">FEATURED MATCHES</h6>
                        {data ? data?.map((match) => {
                            return (
                                <div className="col-md-3">
                                    <div className="match_card">
                                        <p><span className="team_name">{match.teams[0]?.team?.name}</span> {match.teams[0]?.score} {match.teams[0]?.scoreInfo}</p>
                                        <p><span className="team_name">{match.teams[1]?.team?.name}</span> {match.teams[1]?.score} {match.teams[1]?.scoreInfo}</p>
                                        <p className="result">{match.statusText}</p>
                                    </div>
                                </div>
                            )
                        })
                            :
                            initialData?.map((match) => {
                                return (
                                    <div className="col-md-3">
                                        <div className="match_card">
                                            <p>{match.teams[0]?.team?.name} {match.teams[0]?.score} {match.teams[0]?.scoreInfo}</p>
                                            <p>{match.teams[1]?.team?.name} {match.teams[1]?.score} {match.teams[1]?.scoreInfo}</p>
                                            <p className="result">{match.statusText}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row">
                        <h6 className="title mt-5">LATEST NEWS</h6>
                        {
                            allNews?.map((news) => {
                                return (
                                    <div className="col-md-3">
                                        <div className="news_card">
                                            <p>{news.title}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> :
                    <div className="container spinner">
                        <img src={spinner} alt="spinner"></img>
                    </div>
            }

        </div>
    )
}

export default Header;
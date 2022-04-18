import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';
import style from '../Home/Home.Module.css'


export default function Home(props) {

    let imgBase = 'http://image.tmdb.org/t/p/w500/'
    const [trendingMovie, setTrendingMovie] = useState([]);
    const [trendingTVs, setTrendingTvs] = useState([]);
    const [trendingPerson, setTrendingPerson] = useState([]);

    async function GetMovies(Type, Callback) {

        let { data } = await axios.get(`http://api.themoviedb.org/3/trending/${Type}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
        Callback(data.results.slice(0, 10))
    }

    useEffect(() => {
        GetMovies('movie', setTrendingMovie);
        GetMovies('tv', setTrendingTvs);
        GetMovies('person', setTrendingPerson);
    }, [])

    return (
        <>
            <div className='row mt-5'>
                <div className="col-md-4">
                    <div>
                        <div className={`${style.orangebj} Brdr w-25`}></div>
                        <h2 className="text-white">Trending <br /> Movies <br />To Watch Now</h2>
                        <span className="text-muted my-5">Most Watch Movies By Day</span>
                        <div className={`${style.orangebj} Brdr`}></div>

                    </div>
                </div>
                {trendingMovie.map((movie, index) =>
                    <div className="col-md-2" key={index}>
                        <img className={` ${style.imgRedias} img-fluid`} src={imgBase + movie.poster_path} alt="" />
                        <h2 className={`${style.orange} text-center h6 mt-2`}>{movie.title}</h2>
                    </div>
                )}
            </div>
            <div className='row mt-5'>
                <div className="col-md-4">
                    <div>
                        <div className={`${style.orangebj} Brdr w-25`}></div>
                        <h2 className="text-white">Trending <br /> Tv shows <br />To Watch Now</h2>
                        <span className="text-muted my-5">Most Tv-shows By Day</span>
                        <div className={`${style.orangebj} Brdr`}></div>

                    </div>
                </div>
                {trendingTVs.map((movie, index) =>
                    <div className="col-md-2" key={index}>
                        <img className={` ${style.imgRedias} img-fluid`} src={imgBase + movie.poster_path} alt="" />
                        <h2 className={`${style.orange} text-center h6 mt-2`}>{movie.name}</h2>
                    </div>
                )}
            </div>
            <div className='row mt-5'>
                <div className="col-md-4">
                    <div>
                        <div className={`${style.orangebj} Brdr w-25`}></div>
                        <h2 className="text-white">Trending <br /> Persons <br />To Read About</h2>
                        <span className="text-muted my-5">Most Persons By Day</span>
                        <div className={`${style.orangebj} Brdr`}></div>

                    </div>
                </div>
                {trendingPerson.map((movie, index) =>
                    <div className="col-md-2" key={index}>
                        <img className={` ${style.imgRedias} img-fluid`} src={imgBase + movie.profile_path} alt="" />
                        <h2 className={`${style.orange} text-center h6 mt-2`}>{movie.name}</h2>
                    </div>
                )}
            </div>
        </>
    )
}

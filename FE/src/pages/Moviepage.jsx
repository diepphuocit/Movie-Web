import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Bookmark, Play } from 'lucide-react';
import { Link } from 'react-router';

const Moviepage = () => {
    const {id} = useParams(); 
    const [movie, setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M5N2Y0YWY3YzBlNWNhYzRkZTVjNTJiMTZiYjdhNCIsIm5iZiI6MTc1MzUxNTAzMi40MjksInN1YiI6IjY4ODQ4NDE4ZmJjYzJiNjkxNzM4ZjZjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.biEs1AATR9lWqZoD__cFiG5vZIwhB_Cr1rUR7xOri7E'
    }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(res => res.json())
        .then(res => setMovie(res))
        .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setRecommendations(res.results || []))
        .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => {
            const trailer = res.results?.find(
                (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
            );
            setTrailerKey(trailer?.key || null);
        })
        .catch(err => console.error(err));
    }, [id]);
    if (!movie) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <span className='text-xl text-red-500'>Loading...</span>
            </div>
        );      
    }

    return (
        <div className='min-h-screen bg-[#181818] text-white'>
            <div className='relative h-[60vh] flex item-end' style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div 
                className='absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent'>
                </div>
                <div 
                className='relative z-19 flex items-end p-8 gap-8'>                  
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className='rounded-lg shadow-lg w-48 hidden md:block'/>
                    <div>
                        <h1 className='font-bold'>{movie.title}</h1>
                        <div className='flex items-center gap-4 mb-2'>
                            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {movie.genres?.map((genre) => (
                                <span className='bg-[#181818] px-3 py-1 rounded-full text-sm'>{genre.name}</span>
                            ))}
                        </div>
                        <p className='max-w-2x1 text-gary-200 text-sm'>{movie.overview}</p>
                        <div className='flex items-center gap-4 mt-4'>
                            <button className='flex justify-center items-center bg-black hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'><Bookmark className='mr-2 w-4 h-5 md:w-5 md:h-5'/>Save for later</button>
                            <button className='flex justify-center items-center bg-black hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'><Play className='mr-2 w-4 h-5 md:w-5 md:h-5'/>Watch now</button>
                            <Link to={`https://www.youtube.com/watch?v=${trailerKey}`} target='_blank'>
                                <button className='flex justify-center items-center bg-black hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'><Play className='mr-2 w-4 h-5 md:w-5 md:h-5'/>Watch Trailer</button>
                            </Link>
                        </div>                       
                    </div>
                </div>
            </div>
            <div className='p-8'>
                <h2 className='text-2xl font-semibold mb-4'>Information :</h2>
                <div className='bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8'>
                    <div className='flex-1'>
                        <ul className='text-gray-300 space-y-3'>
                            <li>
                                <span className='font-semibold text-white'>Status : </span>
                                <span className='ml-2'>{movie.status}</span>
                            </li>
                            <li>
                                <span className='font-semibold text-white'>Release Date : </span>
                                <span className='ml-2'>{movie.release_date}</span>
                            </li>
                            <li>
                                <span className='font-semibold text-white'>Original Language : </span>
                                <span className='ml-2'>{movie.original_language?.toUpperCase()}</span>
                            </li>
                            <li>
                                <span className='font-semibold text-white'>Production : </span>
                                <span className='ml-2'>{movie.production_companies && movie.production_companies.length > 0 ? movie.production_companies.map((c) => c.name).join(', ') : 'N/A'}</span>
                            </li>
                        </ul>
                    </div>
                    <div className='flex-1'>
                        <ul>
                            <li>
                                <span className='font-semibold text-white'>Duration : </span>
                                <span className='ml-2'>{movie.runtime} min</span>
                            </li>  
                            <li>
                                <span className='font-semibold text-white'>Gernes : </span>
                                <span className='ml-2'>{movie.genres.map(g => g.name).join(', ')}</span>
                            </li>
                        </ul>                       
                    </div>   
                </div>
            </div>
            { recommendations.length > 0 && (
                <div className='p-8'>
                    <h2 className='text-2xl font-semibold mb-4'>Recommendations :</h2>
                    <div className='grid grid-cols-2 md:grid-cols-5 gap-4 text-sm'>
                        {recommendations.slice(0, 10).map((rec) => (
                            <div key={rec.id} className='bg-[#232323] rounded-lg shadow-lg p-4 hover:scale-105 transition-transform duration-200'>
                                <Link to={`/movie/${rec.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/original/${rec.poster_path}`} alt={rec.title} className=' w-full h-80 object-cover'/>
                                    <div>
                                        <h3 className='font-bold'>{rec.title}</h3>
                                    </div>
                                </Link>

                            </div>
                        ))}                  
                    </div>
                </div>
            )}
        </div>
    )
}

export default Moviepage
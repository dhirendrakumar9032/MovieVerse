import { useState, useMemo } from "react";
import { useQuery } from '@tanstack/react-query';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const API_BASE_URL = 'https://api.themoviedb.org/3';


const useFetchData = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }
    
    

    const apiUrl = useMemo(() => {
        const base = `${API_BASE_URL}/${searchQuery.trim() ? 'search/movie' : 'movie/popular'}`;
        return `${base}?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=en-US&page=${page}`;
    }, [searchQuery, page]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['movies', searchQuery, page],
        queryFn: async () => {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            return json; 
        }
    });

    const moviesList = data?.results || [];

    return {
        moviesList,
        isLoading,
        isError,
        error,
        page,
        setSearchQuery,
        handleSearch,
        setPage,
        searchQuery
    };
}

export { useFetchData };

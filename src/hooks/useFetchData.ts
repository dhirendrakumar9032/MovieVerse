import { useState, useEffect, useMemo } from "react";
import { useQuery } from '@tanstack/react-query';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const API_BASE_URL = 'https://api.themoviedb.org/3';

const useFetchData = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(4);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Debouncing search query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300); // Delay in ms

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    const apiUrl = useMemo(() => {
        const base = `${API_BASE_URL}/${debouncedSearchQuery.trim() ? 'search/movie' : 'movie/popular'}`;
        return `${base}?api_key=${API_KEY}&query=${encodeURIComponent(debouncedSearchQuery)}&language=en-US&page=${page}`;
    }, [debouncedSearchQuery, page]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['movies', debouncedSearchQuery, page],
        queryFn: async () => {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
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

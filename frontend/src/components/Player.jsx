import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllCollections, getOneCollection } from '../services/CollectionService';
import MainDisplay from './MainDisplay';
import Playlist from './Playlist';
import usePlayer from './usePlayer';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 7px;
    background-color: #000000;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
;`

export default function Player() {

    const [tracks, setTracks] = useState([]);
    const { setCurrentTrack } = usePlayer();

    useEffect(() => {

        async function load(){
            const playlists = await getAllCollections();
            const playlist = await getOneCollection(playlists.collections[0].id);
            setTracks(playlist.tracks);
            setCurrentTrack(playlist.tracks[0]);
        };
        load()

    }, []);

    return(
        <Container>
            {tracks.length && (
                <>
                    <MainDisplay />
                    <Playlist tracks={tracks} />
                </>
            )}
        </Container>
    )
}

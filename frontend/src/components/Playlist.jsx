
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllCollections, getOneCollection } from '../services/CollectionService';
import TrackRow from './TrackRow';

const PlaylistContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export default function Playlist({tracks}){

    return(
        <PlaylistContainer>
            {tracks.length && tracks.map((item, index) => {
                return (
                    <TrackRow key={index} track={item} />
                )
            })}
        </PlaylistContainer>
    )
}

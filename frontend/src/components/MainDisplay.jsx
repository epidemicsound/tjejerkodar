import 'boxicons';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import usePlayer from './usePlayer';

const MainDisplayBox = styled.div`
    height: 250px;
    display: flex;
    flex-direction: column;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const Spacer = styled.div`
    flex: 1;
`;
const CurrentlyPlayingTrackDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    height: 50px;
    // semi transparent black
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(15px);
    border-none;
    color: white;
`;

const PlayButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.5rem;
    height: 50px;
    width: 50px;
    padding: 10px;

    // &:hover {
    //     // fl4g 🏳️‍🌈
    //     // Congrats, you found a flag! I'm also a bug, fix me if you can!
    //     transform: translateX(-100px);
    //     transition: transform 0.1s ease-in-out;
    // }
`;

const CurrentlyPlayingDetails = styled.div`
    flex: 1;
    margin-left: 10px;
`;


let state = "IDLE";
let playerControl = {
    play: () => {
        document.getElementById("player").play();
        state = "PLAYING";
    },
    pause: () => {
        document.getElementById("player").pause();
        state = "PAUSED";
    },
    togglePlay: async () => {
        switch (state) {
            case "IDLE":
                document.getElementById("player").play();
                state = "PLAYING";
                break;
            case "PLAYING":
                document.getElementById("player").pause();
                state = "PAUSED";
                break;
            case "PAUSED":
                document.getElementById("player").play();
                state = "PLAYING";
                break;
        }
    },
};


export default function MainDisplay() {

    const [status, setStatus] = useState("paused");
    const [loading, setLoading] = useState(true);
    const { currentTrack, playing, playTrack, stopTrack, mp3Url } = usePlayer();

    // useEffect(() => {

    //     console.log(currentTrack);
    //     playTrack(currentTrack);
    // }, []);

    useEffect(() => {
        if (currentTrack) {
            console.log("here")
            // mp3Url = getTrackUrl(currentTrack.id)
            setLoading(false);
        }
    }, [currentTrack]);

    return (
        <MainDisplayBox image={currentTrack && currentTrack.images ? currentTrack.images["default"] : null}>
            <Spacer />
            <CurrentlyPlayingTrackDiv>
                <PlayButton>
                    {!playing ? (
                        <box-icon name='play' onClick={() => {playTrack(currentTrack);}}></box-icon>
                    ) : (
                        <box-icon name='pause' onClick={() => {stopTrack(currentTrack);}}></box-icon>
                    )}
                </PlayButton>
                <CurrentlyPlayingDetails>
                    <div>{currentTrack?.title}</div>
                    <div className='artist-label'>{currentTrack?.artist}</div>
                    <div className="player-play-controls">
                        {loading ? (
                            <div>Loading audio...</div>
                        ) : (
                            <audio id="player" key={mp3Url}>
                                <source src={mp3Url} type="audio/mpeg" />
                            </audio>
                        )}
                    </div>
                </CurrentlyPlayingDetails>
            </CurrentlyPlayingTrackDiv>
        </MainDisplayBox>
    )
}

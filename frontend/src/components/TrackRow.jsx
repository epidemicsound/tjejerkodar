import styled from "styled-components";
import usePlayer from "./usePlayer";
import { formatArtistsList } from "../services/TrackService";

const Row = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0;
    color: #f1f1f1;
    cursor: pointer;

    &:hover {
        background-color: #333333;
        transition: background-color 0.1s ease-in-out;
    }
`;

const PlayIndicator = styled.div`
    width: 30px;
    height: 30px;
    padding: 10px;

    // flag{stop_the_madness} TODO:
    // Stop the spin, replace with your own emoji!
    animation: spin 1s linear infinite;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const TrackName = styled.div`
    font-weight: bold;
;`
const TrackArtists = styled.div`
    font-size: 0.8rem;
    color: #999999;
`;
export default function TrackRow({ track }) {

    const { playTrack, currentTrack, playing } = usePlayer();

    return (
        <Row onClick={() => playTrack(track)}>

            {playing && currentTrack.id === track.id ? (
                <PlayIndicator>
                    💃
                </PlayIndicator>
            ) : (
                <div style={{ width: 30, height: 30, padding: 10 }}>
                    <img src="fl🏳g - replace me with the track image (check api docs)" alt="🥴" width="20px" />
                </div>
            )}
            <div style={{ flex: 1 }}>
                <TrackName>
                    {track.title}
                </TrackName>
                <TrackArtists>{formatArtistsList(track)}</TrackArtists>
            </div>
        </Row>
    );
}

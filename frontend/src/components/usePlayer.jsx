import Cookies from "js-cookie";
import { loginUser } from "../services/AuthenticationService";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getTrackUrl } from "../services/TrackService";

// import * as sessionsApi from "./Sessions";
// import * as usersApi from "./Users";

const PlayerContext = createContext(
  {}
);

// Export the provider as we need to wrap the entire app with it
export function PlayerProvider({
  children,
}) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [token, setToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [mp3Url, setMp3Url] = useState(null);

  // Check if authed on load
  useEffect(() => {
    let ck = Cookies.get("es_player");
    if (!ck) {
      console.log("no cookie");

      async function load() {
        try {
          const t = await loginUser("123456");
          setToken(t);
          Cookies.set("es_player", t);
          setLoading(false);
        } catch (error) {
          console.log(error);
          localStorage.removeItem("userToken");
          Cookies.remove("es_player");
          setToken(null);
          load();
        }
      }

      load();
      return;
    }

    setToken(ck);





    // usersApi.getCurrentUser()
    //   .then((data) => {
    //     console.log(data);
    //     setUser(data.user);
    //     setToken(ck);
    //     setPortal(data.user.portal);
    //   })
    //   .catch((_error) => { })
    //   .finally(() => setLoadingInitial(false));
  }, []);

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.

  async function loadTrack(trackData) {

    const mp3Object = await getTrackUrl(trackData.id);
    console.log(mp3Object);
    setMp3Url(mp3Object.url);
    setCurrentTrack(trackData);
    setPlaying(false);
  }

  function playTrack(trackData) {

    return new Promise(async (resolve, reject) => {
      await loadTrack(trackData);
      console.log("load track");
      await loadTrack(trackData);
      setTimeout(() => {
        console.log("play track");
        document.getElementById("player").play();
      }, 100);
      setCurrentTrack(trackData);
      setPlaying(true);
      resolve();
    })

  }
  function stopTrack() {
    console.log("stop track");
    document.getElementById("player").pause();
    setPlaying(false);
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      token,
      loading,
      error,
      playTrack,
      stopTrack,
      loadTrack,
      currentTrack,
      playing,
      setCurrentTrack,
      mp3Url,
    }),
    [loading, error, token, currentTrack, playing]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <PlayerContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </PlayerContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function usePlayer() {
  return useContext(PlayerContext);
}
